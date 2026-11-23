export const CONTACT_FORM_CONFIG = {
  /**
   * Definir com o Comercial: manter `collectPhone: true` (opcional) ou desativar se não justificado.
   */
  collectPhone: true,
  phoneRequired: false,
  messageMinLength: 10,
  messageMaxLength: 2000,
  /**
   * Cooldown no cliente após envio bem-sucedido (UX contra duplo envio;
   * o limite efetivo é aplicado no servidor via rate limiting).
   */
  submitCooldownSeconds: 15,
  /**
   * Chave pública do Cloudflare Turnstile (nunca colocar secret key no front-end).
   * Se vazia, o widget não é renderizado (útil em desenvolvimento local).
   */
  turnstileSiteKey: (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)?.trim() || '',
  /**
   * Requisitos de privacidade (LGPD): ajustar texto e obrigatoriedade conforme revisão jurídica/PO.
   * Não usar consentimento genérico como substituto da análise da base legal.
   */
  privacy: {
    required: true,
    policyPath: '/politica-de-privacidade',
    policyVersion: '2026-01',
    checkboxPrefix: 'Li e estou ciente da',
    linkLabel: 'Política de Privacidade',
    checkboxSuffix: 'para o tratamento dos dados informados neste contato comercial.',
  },
} as const

export const LANDING_CONTENT = {
  brand: 'Kurae Solutions',
  faqs: [
    {
      question: 'O que é este produto?',
      answer: 'É uma solução completa para organizar e apresentar seu negócio online de forma simples, responsiva e profissional.',
    },
    {
      question: 'Preciso saber programar para usar?',
      answer: 'Não! A plataforma foi pensada para ser acessível a qualquer pessoa, com ou sem experiência técnica.',
    },
    {
      question: 'Funciona em celular e tablet?',
      answer: 'Sim. O layout é totalmente responsivo e foi testado em diferentes tamanhos de tela.',
    },
    {
      question: 'Como faço para entrar em contato?',
      answer: 'Basta preencher o formulário na seção de contato abaixo. Nossa equipe retorna em até 24 horas.',
    },
    {
      question: 'O serviço tem algum custo?',
      answer: 'Temos planos gratuitos e pagos. Entre em contato para conhecer as opções disponíveis para o seu caso.',
    },
  ],
  benefits: [
    {
      icon: 'mdi-cellphone',
      title: 'Totalmente Responsivo',
      description: 'Funciona perfeitamente em qualquer dispositivo — desktop, tablet ou celular.',
    },
    {
      icon: 'mdi-lightning-bolt',
      title: 'Alta Performance',
      description: 'Otimizado para carregamento rápido com lazy loading e assets comprimidos.',
    },
    {
      icon: 'mdi-palette-outline',
      title: 'Design Moderno',
      description: 'Visual limpo e profissional que transmite credibilidade ao seu negócio.',
    },
    {
      icon: 'mdi-shield-check-outline',
      title: 'Seguro por Padrão',
      description: 'Boas práticas de segurança aplicadas desde o início do desenvolvimento.',
    },
    {
      icon: 'mdi-rocket-launch-outline',
      title: 'Fácil de Evoluir',
      description: 'Estrutura modular e organizada para adicionar novas funcionalidades com facilidade.',
    },
    {
      icon: 'mdi-handshake-outline',
      title: 'Suporte Dedicado',
      description: 'Time disponível para ajudar em cada etapa — do início ao lançamento.',
    },
  ],
}