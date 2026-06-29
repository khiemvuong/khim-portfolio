export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Front-End' | 'Back-End' | 'Full Stack';
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  stats?: {
    stars: number;
    forks: number;
  };
  statusBadge?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  color: string; // e.g., 'text-neon-purple' or hex code
}

export interface TechItem {
  name: string;
  icon: string; // Icon name from lucide or custom
  proficiency: number;
  category: string;
  angle: number; // For radial positioning
  radius: number; // Distance from center
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
