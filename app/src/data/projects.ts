export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  external?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // Featured Projects
  {
    title: 'Food Transition Platform',
    description:
      "Built an end-to-end research knowledge platform with large-scale document ingestion, semantic processing, and a custom RAG chatbot for an environmental food research group. Designed a scalable web scraping pipeline using Google Search API and Pub/Sub, processed documents with a Gemini-based semantic extraction agent, and built a PostgreSQL + PGVector knowledge base powering the chatbot.",
    tech: ['Python', 'FastAPI', 'Vue.js', 'Docker', 'GCP', 'Pub/Sub', 'Cloud Run', 'Cloud Build', 'Artifact Registry', 'PostgreSQL', 'PGVector', 'Firestore', 'Firebase', 'RAG', 'AI Agents'],
    image: '/images/projects/food-transition.png',
    github: '#',
    external: '#',
    featured: true,
  },
  {
    title: 'SFL Community Platform',
    description:
      "Engineered a full-stack platform automating operations for a large student football league with 1000+ players. Built a high-traffic SQL backend with pooled connections, implemented authentication and ~100 API endpoints, automated tournament creation, scheduling, match tracking, and player stats. Integrated Stripe payments via webhooks for tournament registration.",
    tech: ['Python', 'FastAPI', 'Vue.js', 'Docker', 'GCP', 'Cloud SQL', 'SQLAlchemy', 'Firestore', 'Firebase', 'Cloud Run', 'Cloud Build', 'Artifact Registry', 'Stripe'],
    image: '/images/projects/sfl-platform.png',
    github: '#',
    external: 'https://sfleague.nl/',
    featured: true,
  },
  {
    title: 'DeepSummit',
    description:
      "Developed a novel dual-transformer deep learning architecture predicting Himalayan summit success using combined personal and meteorological data. Designed custom data fusion mechanisms with 7-day meteorological windowing, implemented intra-sample and inter-sample attention mechanisms, and achieved ~90% prediction accuracy in a complex domain.",
    tech: ['Python', 'PyTorch', 'Transformers', 'Deep Learning', 'Machine Learning'],
    image: '/images/projects/deepsummit.png',
    github: '#',
    featured: true,
  },

  // Other Projects
  {
    title: 'VLA Finetunes and Datasets',
    description:
      "Trained and fine-tuned vision-language-action robotic models and published datasets and checkpoints on Hugging Face. Fine-tuned ACT and SmolVLA models, collected reinforcement learning datasets from real robotic arms, and trained models on cloud VMs and edge hardware.",
    tech: ['Reinforcement Learning', 'VLA', 'VLM', 'Hugging Face', 'GCP VMs', 'Shell', 'SSH', 'NVIDIA Jetson'],
    github: '#',
  },
  {
    title: 'Oral Screen PhD Research Website',
    description:
      "Built a multilingual research website supporting early cancer detection studies at Amsterdam UMC. Developed a clean, responsive multilingual interface (6 languages) and integrated form submission pipeline to research email systems.",
    tech: ['Vue.js', 'Google Cloud Platform', 'Firebase', 'Firestore'],
    external: '#',
  },
  {
    title: 'Animal Classifier CNN',
    description:
      "Benchmarked multiple CNN architectures and preprocessing pipelines on the Animals-10 dataset. Compared EfficientNet, ResNet, and VGG architectures and tested multiple preprocessing strategies.",
    tech: ['Python', 'PyTorch', 'Deep Learning', 'Jupyter', 'CNN'],
    github: '#',
  },
  {
    title: 'ResNet50 Image Classifier',
    description:
      'Implemented a ResNet50 CNN for multi-class scene classification using the Intel image dataset. Built and optimized a multi-class CNN classifier using ResNet50.',
    tech: ['Python', 'PyTorch', 'Deep Learning', 'Jupyter', 'ResNet50', 'CNN'],
    github: 'https://github.com/Aaron-Serpilin/Intel-Multiclass-Image-Classifier',
  }
];
