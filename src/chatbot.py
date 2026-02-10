"""
LangGraph-based chatbot pipeline for Aaron's portfolio.
Implements RAG with grounded responses using the corpus charter.
"""

import os
import re
import logging
from typing import TypedDict, List, Annotated, Optional
from pathlib import Path

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS

from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages

logger = logging.getLogger(__name__)

from data.system_prompt import SYSTEM_PROMPT

# State

class ChatState(TypedDict):

    """
    State for the chatbot graph.
    """

    messages: Annotated[List, add_messages]
    user_message: str
    retrieved_context: str
    response: str
    session_id: str


# Document loading and vector store

class DocumentStore:

    """
    Manages document loading, embedding, and retrieval.
    Loads only the corpus charter markdown file.
    """
    
    def __init__(self):
        self.vector_store: Optional[FAISS] = None
        self.documents: List[Document] = []
        self.is_initialized = False
    
    def load_documents(self, data_dir: str) -> List[Document]:

        """
        Load the corpus charter document.
        """

        documents = []
        data_path = Path(data_dir)
        
        # Load only the corpus charter
        corpus_file = data_path / "corpus_charter.md"
        
        if corpus_file.exists():
            try:
                with open(corpus_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                documents.append(Document(
                    page_content=content,
                    metadata={"source": "corpus_charter.md", "type": "markdown"}
                ))
                logger.info("Loaded corpus charter document")
            except Exception as e:
                logger.error(f"Error loading corpus charter: {e}")
        else:
            logger.error(f"Corpus charter not found at {corpus_file}")
        
        return documents
    
    def initialize(self, data_dir: str, api_key: str):

        """
        Initialize the vector store with documents.
        """

        if self.is_initialized:
            logger.info("Document store already initialized")
            return
        
        logger.info("Initializing document store...")
        
        # Load documents
        self.documents = self.load_documents(data_dir)
        
        if not self.documents:
            logger.error("No documents loaded!")
            return
        
        # Split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
        
        chunks = text_splitter.split_documents(self.documents)
        logger.info(f"Created {len(chunks)} document chunks")
        
        # Create embeddings and vector store
        embeddings = OpenAIEmbeddings(api_key=api_key)
        self.vector_store = FAISS.from_documents(chunks, embeddings)
        
        self.is_initialized = True
        logger.info("Document store initialized successfully")
    
    def retrieve(self, query: str, k: int = 4) -> str:

        """
        Retrieve relevant document chunks for a query.
        Returns context string only (no sources).
        """

        if not self.is_initialized or not self.vector_store:
            return ""
        
        results = self.vector_store.similarity_search(query, k=k)
        
        context_parts = []
        for doc in results:
            context_parts.append(doc.page_content)
        
        return "\n\n---\n\n".join(context_parts)


# Session Memory Store

class SessionMemory:

    """
    In-memory session storage for conversation history.
    """
    
    def __init__(self, max_messages_per_session: int = 20):
        self._store: dict[str, List] = {}
        self.max_messages = max_messages_per_session
    
    def get_history(self, session_id: str) -> List:

        """
        Get conversation history for a session.
        """

        return self._store.get(session_id, [])
    
    def add_message(self, session_id: str, message):

        """
        Add a message to session history.
        """

        if session_id not in self._store:
            self._store[session_id] = []
        
        self._store[session_id].append(message)
        
        # Trim old messages to prevent unbounded growth
        if len(self._store[session_id]) > self.max_messages:
            # Keep system message + recent messages
            self._store[session_id] = self._store[session_id][-self.max_messages:]
    
    def clear_session(self, session_id: str):
        
        """
        Clear a session's history.
        """

        if session_id in self._store:
            del self._store[session_id]


# LangGraph Pipeline

class ChatbotPipeline:

    """
    LangGraph-based basic chatbot pipeline with RAG.
    """
    
    def __init__(self, api_key: str, data_dir: str):
        self.api_key = api_key
        self.data_dir = data_dir
        
        # Initialize components
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=api_key,
            temperature=0.7,
            max_tokens=500
        )
        
        self.doc_store = DocumentStore()
        self.session_memory = SessionMemory()
        
        # Build the graph
        self.graph = self._build_graph()
    
    def initialize(self):

        """
        Initialize the document store.
        """

        self.doc_store.initialize(self.data_dir, self.api_key)
    
    def _build_graph(self) -> StateGraph:

        """
        Build the LangGraph pipeline.
        """

        workflow = StateGraph(ChatState)
        workflow.add_node("retrieve", self._retrieve_node)
        workflow.add_node("generate", self._generate_node)
        workflow.set_entry_point("retrieve")
        workflow.add_edge("retrieve", "generate")
        workflow.add_edge("generate", END)
        return workflow.compile()
    
    def _retrieve_node(self, state: ChatState) -> dict:

        """
        Retrieve relevant context from documents.
        """
        
        user_message = state["user_message"]
        context = self.doc_store.retrieve(user_message, k=4)
        
        return {
            "retrieved_context": context
        }
    
    def _strip_markdown(self, text: str) -> str:

        """
        Remove markdown formatting artifacts from text.
        """
        
        # Remove headers (# ## ### etc.)
        text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)
        
        # Remove bold/italic markers
        text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
        text = re.sub(r'\*([^*]+)\*', r'\1', text)
        text = re.sub(r'__([^_]+)__', r'\1', text)
        text = re.sub(r'_([^_]+)_', r'\1', text)
        
        # Remove bullet points at start of lines
        text = re.sub(r'^\s*[-*•]\s+', '', text, flags=re.MULTILINE)
        
        # Remove numbered lists
        text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)
        
        # Remove inline code backticks
        text = re.sub(r'`([^`]+)`', r'\1', text)
        
        # Remove code blocks
        text = re.sub(r'```[\s\S]*?```', '', text)
        
        # Remove link formatting [text](url) -> text
        text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
        
        # Clean up extra whitespace
        text = re.sub(r'\n{3,}', '\n\n', text)
        text = text.strip()
        
        return text
    
    def _generate_node(self, state: ChatState) -> dict:

        """
        Generate a response using the LLM.
        """

        user_message = state["user_message"]
        context = state["retrieved_context"]
        session_id = state["session_id"]
        
        # Get conversation history
        history = self.session_memory.get_history(session_id)
        
        # Build messages
        messages = [SystemMessage(content=SYSTEM_PROMPT)]
        
        # Add history (limited)
        for msg in history[-6:]:  # Last 6 messages for context
            messages.append(msg)
        
        # Add context and current question
        context_prompt = f"""Based on the following information from Aaron's corpus charter, answer the user's question.

            === CONTEXT ===
            {context if context else "No specific context retrieved."}
            === END CONTEXT ===

            User's question: {user_message}

            Remember: Only use information from the provided context. If something isn't there, say so. Respond in plain text only—no markdown formatting, no headers, no bold, no bullet points.
        """

        messages.append(HumanMessage(content=context_prompt))
        
        # Generate response
        response = self.llm.invoke(messages)
        response_content = response.content
        
        # Strip any markdown artifacts from the response
        response_content = self._strip_markdown(response_content)
        
        # Store in session memory
        self.session_memory.add_message(session_id, HumanMessage(content=user_message))
        self.session_memory.add_message(session_id, AIMessage(content=response_content))
        
        return {
            "response": response_content,
            "messages": [
                HumanMessage(content=user_message),
                AIMessage(content=response_content)
            ]
        }
    
    def chat(self, session_id: str, user_message: str) -> str:

        """
        Process a chat message and return response.
        """
        
        # Ensure initialized
        if not self.doc_store.is_initialized:
            self.initialize()
        
        # Run the graph
        initial_state = {
            "messages": [],
            "user_message": user_message,
            "retrieved_context": "",
            "response": "",
            "session_id": session_id
        }
        
        result = self.graph.invoke(initial_state)
        
        return result["response"]


# Singleton to ensure one instance across lifecycle

_pipeline_instance: Optional[ChatbotPipeline] = None

def get_chatbot_pipeline(api_key: str, data_dir: str) -> ChatbotPipeline:

    """
    Get or create the singleton chatbot pipeline instance.
    """

    global _pipeline_instance
    
    if _pipeline_instance is None:
        _pipeline_instance = ChatbotPipeline(api_key, data_dir)
        _pipeline_instance.initialize()
    
    return _pipeline_instance
