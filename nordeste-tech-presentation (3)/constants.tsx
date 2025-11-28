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
  Cpu
} from 'lucide-react';

export const SLIDES: SlideData[] = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
  {
    id: 4,
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
    id: 5,
    type: SlideType.COMPARISON,
    title: "Custo de Sistemas Prontos (Mercado)",
    subtitle: "Estimativa anual baseada em players como TOTVS, Sankhya, AWS",
    content: [
      "Manutenção/Checklists: R$ 550 - R$ 900/mês",
      "Chamados: R$ 400 - R$ 1.200/mês",
      "Gestão Logística/Comercial: R$ 2.500 - R$ 7.000/mês",
      "RH/Competências: R$ 600 - R$ 3.000/mês",
      "Infraestrutura Cloud: R$ 250 - R$ 1.000/mês"
    ],
    highlight: "Custo Anual: R$ 78.000 a R$ 214.000",
    data: [
      { name: 'Manutenção', min: 6600, max: 10800 },
      { name: 'Chamados', min: 4800, max: 14400 },
      { name: 'ERP/Logística', min: 30000, max: 84000 },
      { name: 'RH', min: 7200, max: 36000 },
      { name: 'Cloud', min: 3000, max: 12000 },
    ],
    icon: "DollarSign"
  },
  {
    id: 6,
    type: SlideType.COMPARISON,
    title: "Custo de Desenvolvimento Externo",
    subtitle: "Se contratássemos uma Software House",
    content: [
      "Desenvolvimento de sistemas personalizados: R$ 50k - R$ 150k (setup)",
      "Hospedagem gerenciada + Suporte: R$ 9.600 - R$ 24.000/ano"
    ],
    highlight: "Total 1º Ano: > R$ 200.000,00",
    data: [
      { name: 'Projeto (Setup)', value: 150000 },
      { name: 'Suporte Anual', value: 24000 },
    ],
    icon: "TrendingDown"
  },
  {
    id: 7,
    type: SlideType.BIG_NUMBER,
    title: "Quanto custa nossa solução?",
    subtitle: "Custo Anual Real",
    highlight: "R$ 216,00",
    content: [
      "Servidor: R$ 0 (Reaproveitado)",
      "Licenças: R$ 0 (Open Source)",
      "Manutenção: R$ 0 (Interna)",
      "Energia: ~R$ 18/mês"
    ],
    icon: "Zap"
  },
  {
    id: 8,
    type: SlideType.BIG_NUMBER,
    title: "Economia Potencial Gerada",
    subtitle: "Valor que deixou de sair do caixa da empresa",
    highlight: "R$ 213.784,00 / ano",
    content: [
      "Comparativo Máximo de Mercado vs Interno",
      "Economia mensal de até R$ 17.800"
    ],
    icon: "TrendingDown"
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
    type: SlideType.QUOTE,
    title: "2025",
    subtitle: "Nordeste Locações",
    highlight: "“De Frente para o Futuro”",
    content: [
      "Tecnologia feita internamente, com propósito, economia e resultado real."
    ],
    icon: "Rocket",
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2072&auto=format&fit=crop"
  }
];

export const FULL_CONTEXT_TEXT = `
O contexto é sobre a empresa Nordeste que desenvolveu sistemas internamente em 2024.
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