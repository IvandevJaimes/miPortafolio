export interface Profile {
  profile_id: number;
  image_url?: string;
  presentation?: string;
  github_link?: string;
  linkedin?: string;
  gmail?: string;
  instagram?: string;
  x?: string;
  fiverr?: string;
  phone?: string;
  cv?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectTag {
  tag_id: number;
  project_id: number;
  tag: string;
}
export interface ProjectImage {
  image_id: number;
  project_id: number;
  url: string;
  alt: string;
}
export interface Project {
  project_id: number;
  title: string;
  description?: string;
  github?: string;
  github_backend?: string;
  github_crud?: string;
  demo?: string;
  featured: number;
  deployed?: number; // 1 = deployed, 0 = not deployed
  monorepo?: string;
  created_at: string;
  updated_at: string;
  tags: ProjectTag[];
  images: ProjectImage[];
}

export interface Skill {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}
export interface SkillCategory {
  id: number;
  name: string;
  label: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  skills?: Skill[];
}
