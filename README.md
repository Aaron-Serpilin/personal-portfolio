# Personal Portfolio

## Overview

Aaron Serpilin's personal portfolio website featuring an AI chatbot assistant that answers questions about his experience, projects, and background.

## Architecture

- **Frontend**: Vue.js + Firebase Hosting with GSAP animations
- **Backend**: FastAPI with LangGraph-based RAG chatbot
- **AI**: OpenAI GPT-4o-mini with document retrieval

---

## Deployment

### Environment

The .env file should have the following variables:

```bash
GC_PROJECT_ID
GC_LOCATION
GC_BUCKET_NAM
GOOGLE_APPLICATION_CREDENTIALS_BASE64
API_KEY
```

For the GCP credentials, after downloading the credentials, one can run the following command to get the `base64` equivalent

```bash
cat cred.json | base64
```

### Frontend

The frontend stack is based on Vue.js and on Firebase. Commands to init the project:
```bash
npm create vue@latest app
cd app
npm install
npm install firebase
npm install -g firebase-tools
firebase login
```

Afterwards, one can simply deploy the changes by running 
```bash
npm run build
firebase deploy
```

Frontend uses Vue.js, Firebase, and GSAP for the animations

---

### Backend

The backend stack is based on FastAPI, and Cloud Build

### Grant access to the Cloud Run service account

```bash
# 1. Get your project number
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

# 2. Grant "Secret Accessor" role to the Cloud Run Service Account
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --role roles/secretmanager.secretAccessor
```

### Give Cloud Build permission to deploy to Cloud Run

```bash
# 1. Get Project ID and Number
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

# 2. Allow Cloud Build to deploy to Cloud Run
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
    --role="roles/run.admin"

# 3. Allow Cloud Build to act as the Service Account that runs your app
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
```

### Build and deploy to Cloud Run using Cloud Build

```bash
gcloud builds submit --config cloudbuild.yaml .
```

### Allow Unauthenticated users to access Cloud Run

```bash
gcloud beta run services add-iam-policy-binding --region=europe-west4 --member=allUsers --role=roles/run.invoker fast-api
```

In case that the Cloud Run has no IAM Bindings at all, not allowing public invocation, run the following command:
```bash
gcloud run services add-iam-policy-binding fast-api \
  --region=europe-west4 \
  --member="allUsers" \
  --role="roles/run.invoker"
```

## AI Chatbot Feature

### How It Works

The chatbot uses a Retrieval-Augmented Generation (RAG) approach:

1. **Document Loading**: Portfolio documents (JSON + Markdown) are loaded at startup
2. **Chunking & Embedding**: Documents are split into chunks and embedded using OpenAI embeddings
3. **Vector Store**: Chunks are stored in a FAISS vector store for similarity search
4. **Retrieval**: When a user asks a question, relevant chunks are retrieved
5. **Generation**: GPT-4o-mini generates a grounded response using the context
6. **Session Memory**: Conversation history is maintained per session

### Source Documents

Documents live in `src/data/`:

| File | Description |
|------|-------------|
| `corpus_charter.md` | Comprehensive personal narrative and knowledge base |


### Backend Setup

```bash
cd src
python -m venv .venv
source .venv/bin/activate  
pip install -r requirements.txt
fastapi dev main.py --port 8080
```

### Frontend Setup

For local development, update the API URL in `config.ts`, either toggling the development or production API.

### Environment Variables

**Backend (`src/.env`):**
```
API_KEY=your-openai-api-key
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome message |
| `/chat` | POST | Chat with the AI assistant |
| `/health` | GET | Health check |

### Chat Request/Response

**Request:**
```json
{
  "session_id": "unique-session-id",
  "user_message": "What projects has Aaron worked on?"
}
```

**Response:**
```json
{
  "assistant_message": "Aaron has worked on several projects...",
  "rate_limited": false
}
```

### Rate Limiting

The API implements IP-based rate limiting:
- **30 requests per minute** per IP
- **Burst protection**: Max 5 requests in 10 seconds
- Returns HTTP 429 when exceeded
- Respects `X-Forwarded-For` header for proxy environments

### Extending the Chatbot

**To add Redis session storage:**
1. Install `redis` package
2. Replace `SessionMemory` class in `chatbot.py` with Redis-backed implementation
3. Update initialization in `ChatbotPipeline`

**To modify the system prompt:**
Edit `SYSTEM_PROMPT` in `src/chatbot.py`

**To adjust RAG parameters:**
- Chunk size: `chunk_size` in `DocumentStore.initialize()`
- Number of retrieved chunks: `k` parameter in `retrieve()`
- LLM temperature: `temperature` in `ChatbotPipeline.__init__()`

---

## Project Structure

```
personal-portfolio/
├── app/                    # Frontend (Vue.js)
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   │   ├── ChatbotLauncher.vue
│   │   │   │   ├── ChatbotPanel.vue
│   │   │   │   └── ChatMessage.vue
│   │   │   └── pages/
│   │   ├── styles/
│   │   └── App.vue
│   └── ...
├── src/                    # Backend (FastAPI)
│   ├── data/              # Portfolio documents
│   │   ├── corpus_charter.md
│   │   
│   ├── main.py            # API endpoints + rate limiting
│   ├── chatbot.py         # LangGraph RAG pipeline
│   ├── schemas.py         # Pydantic models
│   └── requirements.txt
└── README.md
```