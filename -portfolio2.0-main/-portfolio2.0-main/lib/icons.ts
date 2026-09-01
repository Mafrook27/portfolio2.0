// Icon registry: content JSON references icons by name so new entries
// never require a code change. Unknown names fall back to a generic icon.
import type { ComponentType } from 'react';
import {
  Award,
  BookOpen,
  Code2,
  Cpu,
  FileText,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Phone,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  Rocket,
  Database,
  Globe,
  PenTool,
} from 'lucide-react';
import { FaJava, FaHtml5, FaCss3Alt, FaPython, FaReact, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import {
  SiJavascript,
  SiMysql,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiPostman,
  SiTypescript,
  SiReactquery,
  SiRedis,
  SiVercel,
  SiFirebase,
} from 'react-icons/si';

export type IconComponent = ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

const registry: Record<string, IconComponent> = {
  // lucide
  Award, BookOpen, Code2, Cpu, FileText, Github, GraduationCap, Layout,
  Linkedin, Phone, ShieldCheck, Sparkles, Terminal, Wrench, Rocket,
  Database, Globe, PenTool,
  // react-icons
  FaJava, FaHtml5, FaCss3Alt, FaPython, FaReact, FaGitAlt, FaDocker, FaAws,
  SiJavascript, SiMysql, SiExpress, SiMongodb, SiTailwindcss, SiPostman,
  SiTypescript, SiReactquery, SiRedis, SiVercel, SiFirebase,
};

export function getIcon(name?: string): IconComponent {
  return (name && registry[name]) || Code2;
}
