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
    title: 'Niche Food Transition RAG Platform',
    description:
      "A niche RAG chatbot and library platform built for a research group in the Netherlands focusing on environmentally sustainable developments in the food transition domain. The database was built by scraping the internet leveraging Google's GSE API. Processing was done through a Gemini-based AI agent, extracting meaning from all possible semantics, not only text. Search and processing was done through Pub/Sub calls.",
    tech: ['Python', 'FastAPI', 'Docker', 'RAG', 'PSQL', 'Cloud Build', 'Cloud Run', 'Firebase', 'Firestore', 'Artifact Registry', 'Pub/Sub', 'Web Scraping', 'Vue.js'],
    image: '/images/projects/food-transition.png',
    github: 'https://github.com/storks-amsterdam/conversational-agent',
    external: 'https://food-transition.web.app/',
    featured: true,
  },

  // Other Projects
  {
    title: 'ResNet50 Intel Classifier ',
    description:
      'A small personal project developing a notebook with a ResNet50 based classifier on the Intel Multiclass dataset',
    tech: ['PyTorch', 'Jupyter', 'ResNet50', 'Deep Learning', 'CNN'],
    github: 'https://github.com/Aaron-Serpilin/Intel-Multiclass-Image-Classifier',
  }
];
