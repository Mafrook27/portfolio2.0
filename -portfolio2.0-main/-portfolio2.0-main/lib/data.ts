// All portfolio data lives in /content/data/*.json — edit those files (no
// code changes) to add projects, skills, certifications or experience.
// Icons are referenced by name and resolved through lib/icons.ts.
import { getIcon, type IconComponent } from './icons';
import socialsJson from '../content/data/socials.json';
import skillsJson from '../content/data/skills.json';
import projectsJson from '../content/data/projects.json';
import certificationsJson from '../content/data/certifications.json';
import experienceJson from '../content/data/experience.json';
import educationJson from '../content/data/education.json';

export interface SocialLink {
  name: string;
  link: string;
  icon: IconComponent;
}

export interface Skill {
  label: string;
  percentage: number;
  color: string;
  icon: IconComponent;
}

export interface Project {
  title: string;
  desc: string;
  github: string;
  technologies: string[];
  icon: IconComponent;
}

export interface Certification {
  title: string;
  description: string;
  url: string;
  icon: IconComponent;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | null;
  points: string[];
}

const withIcon = <T extends { icon?: string }>(item: T) => ({
  ...item,
  icon: getIcon(item.icon),
});

export const socialLinks: SocialLink[] = socialsJson.map(withIcon);

export const skills: Record<'languages' | 'frameworks' | 'tools' | 'ai', Skill[]> = {
  languages: skillsJson.languages.map(withIcon),
  frameworks: skillsJson.frameworks.map(withIcon),
  tools: skillsJson.tools.map(withIcon),
  ai: skillsJson.ai.map(withIcon),
};

export const projects: Project[] = projectsJson.map(withIcon);

export const certifications: Certification[] = certificationsJson.map(withIcon);

export const experience: Experience[] = experienceJson;

export const education = educationJson;
