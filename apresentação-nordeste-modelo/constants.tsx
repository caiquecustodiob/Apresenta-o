import { SlideData, SlideType } from './types';
import { 
  History, 
  Layers, 
  Server, 
  ShieldCheck, 
  DollarSign, 
  TrendingDown, 
  Zap, 
  Lightbulb, 
  CheckCircle,
  Rocket,
  Code,
  Palette,
  FileJson,
  Database,
  Cpu,
  Monitor,
  ClipboardList,
  Truck,
  Wrench,
  Users,
  Box,
  Target,
  Eye,
  Heart
} from 'lucide-react';

export const SLIDES: SlideData[] = [
  // --- SLIDES INSTITUCIONAIS (MANIFESTO) ---
  {
    id: 0,
    type: SlideType.MANIFESTO,
    title: "Nordeste Locações",
    subtitle: "Apresentação Institucional",
    content: ["Bem-vindo"], // Fallback para não quebrar, mas será substituído visualmente pelo Logo
    backgroundImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: 1,
    type: SlideType.MANIFESTO,
    title: "NOSSA MISSÃO",
    content: [
      "Impactar positivamente o dia daqueles que se relacionam conosco."
    ],
    backgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    type: SlideType.MANIFESTO,
    title: "NOSSA VISÃO",
    content: [
      "Ser o principal parceiro em locação de equipamentos, transformando máquinas em produtividade que impulsiona o crescimento do Nordeste."
    ],
    backgroundImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    type: SlideType.MANIFESTO,
    title: "NOSSOS VALORES",
    content: [
      "Ser protagonista para crescer.",
      "Atendimento com a vontade genuína de ajudar.",
      "Não há hierarquia para boas ideias.",
      "Nos divertimos enquanto trabalhamos.",
      "Fazemos o que é certo.",
      "Gente faz a diferença."
    ],
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
  },
  // --- FIM DOS SLIDES INSTITUCIONAIS ---
  {
    id: 4,
    type: SlideType.TITLE,
    title: "Revolução Interna: O Ecossistema Nordeste",
    subtitle: "Como transformamos papel em eficiência digital com custo zero.",
    content: [
      "Em 2024, percebemos que muitos processos internos dependiam de papel, deslocamento e memória.",
      "Pedidos se perdiam, não havia rastreabilidade, nem controle real de tempo.",
      "Solução: Desenvolvimento interno focado na operação real."
    ],
    icon: "History",
    backgroundImage: "https://picsum.photos/id/4/1920/1080"
  },
  {
    id: 5,
    type: SlideType.LIST,
    title: "O que construímos",
    subtitle: "Sistemas Web Leves (HTML + CSS + JS + Node.js + SQL)",
    content: [
      "PRD — Requisições (Manutenção / PCM / Almoxarifado)",
      "Checklists de Motos (saída e chegada)",
      "Checklists de Equipamentos (linha leve e pesada)",
      "POP de manutenção e liberação técnica",
      "Painel de Matriz de Competência dos Motoristas",
      "LogiFlow — Comercial ↔ Logística (em desenvolvimento)",
      "Acesso via Wi-Fi #Nordeste (Zero instalação)"
    ],
    icon: "Layers"
  },
  {
    id: 6,
    type: SlideType.PROCESS,
    title: "Como funciona na prática",
    subtitle: "Infraestrutura Simples e Segura",
    content: [
      "Hardware: Desktop reaproveitado (Windows 10)",
      "Ativação: via npm (Node.js)",
      "Acesso: Interno pelo navegador",
      "Segurança: Senhas criptografadas, dados 100% locais",
      "Resiliência: Falha de hardware? Basta mover o HD."
    ],
    icon: "Server"
  },
  {
    id: 7,
    type: SlideType.TECH_STACK,
    title: "Nossa Stack Tecnológica",
    subtitle: "São sistemas leves construídos com:",
    icon: "Code",
    techItems: [
      {
        name: "HTML",
        description: "A Estrutura. O esqueleto que organiza o conteúdo de cada página.",
        icon: "FileCode",
        color: "text-orange-500"
      },
      {
        name: "CSS",
        description: "O Estilo. Responsável pela beleza, cores e organização visual.",
        icon: "Palette",
        color: "text-blue-500"
      },
      {
        name: "JavaScript",
        description: "A Inteligência. Cria interatividade e faz tudo funcionar no navegador.",
        icon: "FileJson",
        color: "text-yellow-400"
      },
      {
        name: "Node.js",
        description: "O Motor. Roda no servidor, processando pedidos e regras de negócio.",
        icon: "Cpu",
        color: "text-green-500"
      },
      {
        name: "SQL",
        description: "A Memória. Banco de dados que guarda todas as informações com segurança.",
        icon: "Database",
        color: "text-slate-400"
      }
    ]
  },
  // --- NOVOS SLIDES DE SISTEMAS (SHOWCASE) ---
  {
    id: 8,
    type: SlideType.SHOWCASE,
    title: "PRD – Programa de Requisição Digital",
    subtitle: "Modernização do processo de requisição de peças (2024)",
    icon: "ClipboardList",
    content: [
      "Substituição de comandas em papel e deslocamento físico. Antes, havia risco de perda, falta de rastreabilidade e dados dispersos.",
      "Eliminou problemas de perda, trouxe rastreamento total, centralização de dados, histórico consolidado e agilidade entre PCM e Almoxarifado."
    ]
  },
  {
    id: 9,
    type: SlideType.SHOWCASE,
    title: "Checklist de Motos",
    subtitle: "Manutenção Externa e Controle de Frotas",
    icon: "Bike",
    content: [
      "Substituição do checklist físico diário para motos em rota externa. O modelo antigo gerava acúmulo de papel e dificultava consultas.",
      "Eliminação de papel, registro digital centralizado, rastreabilidade instantânea e maior controle operacional da frota."
    ]
  },
  {
    id: 10,
    type: SlideType.SHOWCASE,
    title: "Checklist de Liberação",
    subtitle: "Linha Pesada - Segurança e Transparência",
    icon: "Truck",
    content: [
      "Garantia de que o estado do equipamento pesado seja registrado digitalmente antes da liberação, algo que não existia de forma prática.",
      "Histórico auditável, comparações visuais e evidências do estado de saída, trazendo segurança técnica e operacional."
    ]
  },
  {
    id: 11,
    type: SlideType.SHOWCASE,
    title: "POP de Manutenção",
    subtitle: "Padronização para Linha Leve",
    icon: "Wrench",
    content: [
      "Padronização do processo de manutenção executado por mecânicos júnior, guiando o passo a passo técnico via interface digital.",
      "Redução significativa de falhas e índice de retrabalho logo no primeiro mês, garantindo consistência e confiabilidade."
    ]
  },
  {
    id: 12,
    type: SlideType.SHOWCASE,
    title: "Matriz de Competências",
    subtitle: "Gestão de Performance de Motoristas",
    icon: "Users",
    content: [
      "Método automatizado para avaliação de motoristas ('Melhor do Mês' e feedbacks), centralizando dados antes manuais ou dispersos.",
      "Centralização da informação, suporte à gestão logística e acompanhamento claro da evolução profissional da equipe."
    ]
  },
  {
    id: 13,
    type: SlideType.SHOWCASE,
    title: "LogiFlow",
    subtitle: "Sistema de Solicitação de Pedidos (Em Desenvolvimento)",
    icon: "Box",
    content: [
      "Centralização de todos os canais de solicitação para padronizar o fluxo entre Comercial e Logística, unificando a visualização.",
      "Agilidade no fluxo, clareza nas informações, redução de ruídos de comunicação e maior transparência entre setores."
    ]
  },
  // --- FIM DOS SLIDES SHOWCASE ---
  {
    id: 14,
    type: SlideType.LIST,
    title: "Por que desenvolver internamente?",
    subtitle: "A vantagem estratégica",
    content: [
      "Resolvem problemas reais da operação (sob medida)",
      "Evitam sistemas de mercado caros e engessados",
      "Total personalização e evolução contínua",
      "Sem mensalidade, sem contratos, sem burocracia",
      "Velocidade para corrigir e melhorar processos"
    ],
    icon: "ShieldCheck"
  },
  {
    id: 15,
    type: SlideType.COMPARISON,
    title: "Custo de Sistemas Prontos (SaaS)",
    subtitle: "SaaS Básicos vs Robustos (Sankhya, TOTVS)",
    content: [
      "SaaS Básicos (Estoque/Forms): R$ 150 - R$ 400/mês",
      "SaaS Intermediários (Rastreio): R$ 500 - R$ 2.000/mês",
      "Sistemas Robustos: R$ 1.500 - R$ 6.000/mês (+ Setup 20k)",
      "Para o Ecossistema atual: Necessário 3 a 5 sistemas.",
      "Mensalidade Mínima Estimada: R$ 4.500,00"
    ],
    highlight: "Custo Anual Mín: R$ 54.000",
    data: [
      { name: 'SaaS Básico', min: 1800, max: 4800 },
      { name: 'SaaS Médio', min: 6000, max: 24000 },
      { name: 'SaaS Robusto', min: 18000, max: 72000 },
      { name: 'Combo (3-5 systems)', min: 54000, max: 90000 },
    ],
    icon: "DollarSign"
  },
  {
    id: 16,
    type: SlideType.COMPARISON,
    title: "Desenvolvimento Terceirizado",
    subtitle: "Custo para criar o mesmo Ecossistema fora",
    content: [
      "Sistema Único Simples: R$ 10k - R$ 25k",
      "Sistema Completo Médio: R$ 30k - R$ 60k",
      "Ecossistema Completo (O que temos): R$ 120k - R$ 250k",
      "Manutenção Mensal: R$ 1.500 - R$ 4.000"
    ],
    highlight: "Investimento: > R$ 120.000",
    data: [
      { name: 'Simples', value: 25000 },
      { name: 'Médio', value: 60000 },
      { name: 'Ecossistema Completo', value: 120000 },
    ],
    icon: "TrendingDown"
  },
  {
    id: 17,
    type: SlideType.BIG_NUMBER,
    title: "Custo Real do Ecossistema",
    subtitle: "Manutenção Interna (Proporcional)",
    highlight: "R$ 391,28 / mês",
    content: [
      "Salário (20% dedicação): R$ 373,28",
      "Energia (Servidor 24h): ~R$ 18,00",
      "Licenças/Ferramentas: R$ 0,00",
      "Total Anual: ~R$ 4.700"
    ],
    icon: "Zap"
  },
  {
    id: 18,
    type: SlideType.BIG_NUMBER,
    title: "Economia Real Gerada",
    subtitle: "Comparativo: 3 Sistemas Robustos vs Interno",
    highlight: "R$ 49.304 / ano",
    content: [
      "Economia Mensal: R$ 4.108,72",
      "Projeção em 3 anos: R$ 147.913,92",
      "Zero mensalidades externas."
    ],
    icon: "TrendingDown"
  },
  {
    id: 19,
    type: SlideType.LIST,
    title: "Impacto Direto",
    subtitle: "Além do financeiro",
    content: [
      "Processos mais rápidos e organizados",
      "Registro e rastreabilidade real (Fim do papel)",
      "Redução de erros e retrabalho",
      "Comunicação clara entre setores",
      "Autonomia tecnológica e base para expansão"
    ],
    icon: "CheckCircle"
  },
  {
    id: 20,
    type: SlideType.PROCESS,
    title: "A Fórmula",
    subtitle: "Metodologia Ágil Interna",
    content: [
      "1. Entender o processo",
      "2. Enxergar uma falha",
      "3. Desenvolver a solução",
      "4. Validar com quem usa"
    ],
    highlight: "Simples. Eficiente. Adaptado.",
    icon: "Lightbulb"
  },
  {
    id: 21,
    type: SlideType.QUOTE,
    title: "2025",
    subtitle: "Nordeste Locações",
    highlight: "“De Frente para o Futuro”",
    content: [
      "O Ecossistema Digital desenvolvido internamente entrega automação total, integração, zero mensalidades e uma economia anual superior a R$ 49 mil.",
      "Tecnologia feita sob medida, com custo mínimo e impacto máximo."
    ],
    icon: "Rocket",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2072&auto=format&fit=crop"
  }
];

export const FULL_CONTEXT_TEXT = `
O contexto é sobre a empresa Nordeste que desenvolveu sistemas internamente em 2024.
Missão: Impactar positivamente o dia daqueles que se relacionam conosco.
Visão: Ser o principal parceiro em locação de equipamentos, transformando máquinas em produtividade que impulsiona o crescimento do Nordeste.
Valores: Ser protagonista, Atendimento genuíno, Sem hierarquia para ideias, Diversão no trabalho, Fazer o certo, Gente faz a diferença.
Antes: Processos em papel, sem rastreabilidade.
Sistema 1: PRD (Requisição de Pedidos).
Metodologia: Observar processo -> identificar falha -> criar solução -> validar.
Tech Stack: HTML, CSS, JS, Node.js, SQL. Rodando em desktop Windows 10 reaproveitado.
Sistemas: PRD, Checklists (Motos/Equipamentos), POP manutenção, Matriz Competência, LogiFlow.
Vantagens: Resolve problemas reais, personalização total, sem custo mensal.
Custos de Mercado (Estimados): Manutenção (550-900), Chamados (400-1200), ERP (2500-7000), RH (600-3000), Cloud (250-1000). Total anual de mercado: 78k a 214k.
Custos Dev Externo: 50k a 150k setup + suporte. Total > 200k.
Custo Interno Real: R$ 0 licença, R$ 0 servidor. Apenas energia (~R$ 18/mês) = R$ 216/ano.
Economia: R$ 77k a 213k por ano.
Impacto: Rapidez, rastreabilidade, fim do papel, autonomia.
`;