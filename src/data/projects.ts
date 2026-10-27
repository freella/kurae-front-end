export interface ProjectSection {
  title: string
  body: string
}

export interface Project {
  slug: string
  type: 'client' | 'conceptual'
  tag: string
  name: string
  shortDesc: string
  year: string
  stack: string[]
  cover: string | null
  accentColor: string
  sections: ProjectSection[]
  results: string[]
}

export const projects: Project[] = [
  {
    slug: 'vitalis',
    type: 'client',
    tag: 'Case real',
    name: 'Vitalis',
    shortDesc: 'Sistema de fila inteligente para clínicas veterinárias municipais',
    year: '2026',
    stack: ['Vue.js', 'Django REST', 'PostgreSQL', 'Redis'],
    cover: null,
    accentColor: '#00C896',
    sections: [
      {
        title: 'O problema',
        body: 'Clínicas veterinárias municipais de Belém operavam com filas físicas desorganizadas, sem triagem estruturada e sem dados de atendimento. O resultado era tempo de espera imprevisível, animais sem prioridade adequada e gestão no escuro.',
      },
      {
        title: 'A solução',
        body: 'O Vitalis é um sistema de gerenciamento de filas com triagem automática, painel de chamada em tempo real e central de informações para o cidadão. Desenvolvido como produto licenciável — cada prefeitura recebe o código e opera na própria infraestrutura.',
      },
      {
        title: 'Modelo de negócio',
        body: 'Licenciamento de software para prefeituras e órgãos públicos. O mesmo código-base pode ser adaptado para UBSs, secretarias de educação e centros de assistência social.',
      },
    ],
    results: [
      'Piloto em andamento em Belém (PA)',
      'Adaptável a qualquer serviço público de atendimento',
    ],
  },
  {
    slug: 'guarani',
    type: 'conceptual',
    tag: 'Produto próprio',
    name: 'Guarani',
    shortDesc: 'Marketplace de crédito de carbono com auditoria integrada',
    year: '2026',
    stack: ['Vue.js', 'Django REST', 'PostgreSQL'],
    cover: null,
    accentColor: '#4ADE80',
    sections: [
      {
        title: 'O problema',
        body: 'O mercado voluntário de carbono no Brasil é fragmentado, sem rastreabilidade e dominado por intermediários opacos. Empresas que querem compensar emissões não têm onde comprar com confiança.',
      },
      {
        title: 'A solução',
        body: 'A Guarani conecta vendedores de crédito de carbono (produtores florestais, projetos de energia limpa) com empresas compradoras dentro de uma plataforma que audita e certifica cada crédito negociado.',
      },
      {
        title: 'Modelo de negócio',
        body: 'Três fontes de receita: implementação (onboarding pago), monitoramento recorrente dos vendedores e taxa percentual sobre cada transação. Receita desde o primeiro cliente, crescimento com o volume.',
      },
    ],
    results: [
      'Três fontes de receita independentes',
      'Monitoramento ativo de créditos certificados',
      'Receita recorrente via contratos de auditoria',
      'Escalável sem infraestrutura própria dos vendedores',
    ],
  },
  {
    slug: 'projectgov',
    type: 'conceptual',
    tag: 'Conceitual',
    name: 'ProjectGov',
    shortDesc: 'Gestão de projetos para órgãos públicos brasileiros',
    year: '2025',
    stack: ['Vue.js', 'Node.js', 'PostgreSQL'],
    cover: null,
    accentColor: '#818CF8',
    sections: [
      {
        title: 'O problema',
        body: 'Órgãos públicos gerenciam projetos complexos em planilhas e e-mails. Não há rastreabilidade de decisões, prazos ou responsáveis — o que torna fiscalização e prestação de contas quase impossíveis.',
      },
      {
        title: 'A solução',
        body: 'Plataforma de gestão de projetos desenhada para o fluxo do setor público: controle de etapas, registro de decisões com justificativa, alertas de prazo e exportação de relatórios para portais de transparência.',
      },
      {
        title: 'Diferenciais',
        body: 'Integração com sistemas de licitação (PNCP), exportação em formato compatível com LRF e trilha de auditoria imutável para cada alteração de escopo ou prazo.',
      },
    ],
    results: [
      'Conceito validado com gestores públicos',
      'Integração prevista com PNCP e portais de transparência',
      'Trilha de auditoria imutável',
      'Em fase de proposta para editais',
    ],
  },
]
