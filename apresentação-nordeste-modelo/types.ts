export enum SlideType {
  TITLE = 'TITLE',
  LIST = 'LIST',
  PROCESS = 'PROCESS',
  COMPARISON = 'COMPARISON',
  BIG_NUMBER = 'BIG_NUMBER',
  QUOTE = 'QUOTE',
  TECH_STACK = 'TECH_STACK',
  SHOWCASE = 'SHOWCASE',
  MANIFESTO = 'MANIFESTO'
}

export interface TechItem {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string[];
  highlight?: string; // For big numbers or key phrases
  data?: any[]; // For charts
  icon?: string;
  backgroundImage?: string;
  techItems?: TechItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PresentationTheme {
  companyName: string;
  logoUrl: string;
  primaryColor: string;    // Camada 1: Destaque Principal
  secondaryColor: string;  // Camada 2: Gradientes / Subtitulos
  tertiaryColor: string;   // Camada 3: Bordas / Fundos sutis
  quaternaryColor: string; // Camada 4: Detalhes / Acentos
}