export interface Project {
  title: string;
  description: string;
  tech: string[];
  year: number;
  image?: string;
  github?: string;
  external?: string;
  featured?: boolean;
  inDevelopment?: boolean;
}

export const projects: Project[] = [
  // Featured Projects
  {
    title: 'DeepSummit-v2',
    description:
      "A proof of my living love for mountaineering and software. An open-source continuation and improvement of DeepSummit, bringing enhanced architecture and expanded capabilities to predict Himalayan summit success.",
    tech: ['Python', 'PyTorch', 'Transformers', 'Deep Learning', 'Machine Learning'],
    year: 2026,
    image: '/images/projects/deepsummit-v2.png',
    github: 'https://github.com/Aaron-Serpilin/DeepSummit-v2',
    featured: true,
    inDevelopment: true,
  },
  {
    title: 'Food Transition Platform',
    description:
      "Built an end-to-end research knowledge platform with large-scale document ingestion, semantic processing, and a custom RAG chatbot for an environmental food research group. Designed a scalable web scraping pipeline using Google Search API and Pub/Sub, processed documents with a Gemini-based semantic extraction agent, and built a PostgreSQL + PGVector knowledge base powering the chatbot.",
    tech: ['Python', 'FastAPI', 'Vue.js', 'Docker', 'GCP', 'Pub/Sub', 'Cloud Run', 'Cloud Build', 'Artifact Registry', 'PostgreSQL', 'PGVector', 'Firestore', 'Firebase', 'RAG', 'AI Agents'],
    year: 2026,
    image: '/images/projects/food-transition.png',
    github: 'https://github.com/storks-amsterdam/conversational-agent',
    external: 'https://food-transition.web.app/',
    featured: true,
  },
  {
    title: 'SFL Community Platform',
    description:
      "Engineered a full-stack platform automating operations for a large student football league with 1000+ players. Built a high-traffic SQL backend with pooled connections, implemented authentication and ~100 API endpoints, automated tournament creation, scheduling, match tracking, and player stats. Integrated Stripe payments via webhooks for tournament registration.",
    tech: ['Python', 'FastAPI', 'Vue.js', 'Docker', 'GCP', 'Cloud SQL', 'SQLAlchemy', 'Firestore', 'Firebase', 'Cloud Run', 'Cloud Build', 'Artifact Registry', 'Stripe'],
    year: 2026,
    image: '/images/projects/sfl-platform.png',
    github: 'https://github.com/storks-amsterdam/sfl-website',
    external: 'https://sfleague.nl/',
    featured: true,
  },

  // Other Projects
  {
    title: 'DeepSummit',
    description:
      "Developed a novel dual-transformer deep learning architecture predicting Himalayan summit success using combined personal and meteorological data. Designed custom data fusion mechanisms with 7-day meteorological windowing, implemented intra-sample and inter-sample attention mechanisms, and achieved ~90% prediction accuracy in a complex domain.",
    tech: ['Python', 'PyTorch', 'Transformers', 'Deep Learning', 'Machine Learning'],
    year: 2025,
    github: 'https://github.com/Aaron-Serpilin/DeepSummit',
  },
  {
    title: 'VLA Finetunes and Datasets',
    description:
      "Trained and fine-tuned vision-language-action robotic models and published datasets and checkpoints on Hugging Face. Fine-tuned ACT and SmolVLA models, collected reinforcement learning datasets from real robotic arms, and trained models on cloud VMs and edge hardware.",
    tech: ['Reinforcement Learning', 'VLA', 'VLM', 'Hugging Face', 'GCP VMs', 'Shell', 'SSH', 'NVIDIA Jetson'],
    year: 2025,
    external: 'https://huggingface.co/aaron-ser',
  },
  {
    title: 'Oral Screen PhD Research Website',
    description:
      "Built a multilingual research website supporting early cancer detection studies at Amsterdam UMC. Developed a clean, responsive multilingual interface (6 languages) and integrated form submission pipeline to research email systems.",
    tech: ['Vue.js', 'Google Cloud Platform', 'GCP', 'Firebase', 'Firestore'],
    year: 2026,
    github: 'https://github.com/storks-amsterdam/cancer-detection-website',
    external: 'https://oralscreen.org/',
  },
  {
    title: 'Animal Classifier CNN',
    description:
      "Benchmarked multiple CNN architectures and preprocessing pipelines on the Animals-10 dataset. Compared EfficientNet, ResNet, and VGG architectures and tested multiple preprocessing strategies.",
    tech: ['Python', 'PyTorch', 'Deep Learning', 'Jupyter', 'CNN'],
    year: 2024,
    github: 'https://github.com/Aaron-Serpilin/Animal-Classifier',
  },
  {
    title: 'ResNet50 Image Classifier',
    description:
      'Implemented a ResNet50 CNN for multi-class scene classification using the Intel image dataset. Built and optimized a multi-class CNN classifier using ResNet50.',
    tech: ['Python', 'PyTorch', 'Deep Learning', 'Jupyter', 'ResNet50', 'CNN'],
    year: 2024,
    github: 'https://github.com/Aaron-Serpilin/Intel-Multiclass-Image-Classifier',
  },
  {
    title: 'Zero-To-Mastery PyTorch',
    description:
      'Comprehensive introduction to PyTorch and deep learning fundamentals. Learned PyTorch workflows, practiced transfer learning and model freezing, explored experiment tracking and paper replication, and built classification models.',
    tech: ['PyTorch', 'Deep Learning', 'Machine Learning', 'Jupyter'],
    year: 2024,
    github: 'https://github.com/Aaron-Serpilin/Zero-To-Mastery-Pytorch',
    external: 'https://zerotomastery.io/',
  },
  {
    title: 'FreeCodeCamp LangGraph',
    description:
      'Introductory course on LangGraph focusing on agent state management and RAG pipeline design. Built basic agent workflows and explored RAG pipeline architecture.',
    tech: ['LangGraph', 'LangChain', 'AI Agents', 'RAG'],
    year: 2025,
    github: 'https://github.com/Aaron-Serpilin/LangGraph-Course',
    external: 'https://www.freecodecamp.org/',
  },
  {
    title: 'HuggingFace AI Agents',
    description:
      'Introduction to AI agent architectures and ecosystem integrations including function calling and agent frameworks. Explored integrations with LangGraph and studied Anthropic-style agent workflows.',
    tech: ['AI Agents', 'LangGraph', 'Anthropic', 'Hugging Face'],
    year: 2025,
    github: 'https://github.com/Aaron-Serpilin/HuggingFace-AI-Agents',
    external: 'https://huggingface.co/',
  },
];
