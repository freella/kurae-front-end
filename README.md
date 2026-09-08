# Frontend Template - Vue 3 + Vite + Vuetify

Este é um template de frontend robusto construído com Vue 3, utilizando Vite para build, Pinia para gerenciamento de estado e Vuetify para componentes de UI. O projeto já vem configurado com um sistema completo de autenticação, controle de rotas e layouts dinâmicos.

## 🚀 Tecnologias Principais

- **Vue 3** (Composition API & `<script setup>`)
- **Vite**
- **Vuetify 3** (UI Framework)
- **Pinia** (Gerenciamento de Estado)
- **Vue Router** (Roteamento com Guardas de Navegação)
- **Axios** (Cliente HTTP com Interceptors)

## ✨ Funcionalidades Implementadas

### 1. Autenticação e Segurança
- **Gerenciamento de Token:** Utiliza `Pinia` (`auth.store.ts`) para gerenciar o estado de autenticação.
- **Axios Interceptors (`src/services/api.ts`):**
  - *Request:* Injeta automaticamente o token `Authorization: Bearer ...` em todas as requisições se o usuário estiver logado.
  - *Response:* Intercepta erros 401 (Não autorizado) para realizar logout automático.
  - *Loader Global:* Aciona a store de `loader` para exibir feedback visual durante requisições.
- **Proteção de Rotas:** O `router/index.ts` verifica a meta-propriedade `requiresAuth` para redirecionar usuários não autenticados para o login.

### 2. Sistema de Layouts
O projeto utiliza um sistema de layouts controlado via meta-dados das rotas (`meta: { layout: 'auth' }`):
- **AuthLayout:** Usado nas páginas de Login e Registro (centralizado, fundo gradiente).
- **DashboardLayout:** Usado nas áreas internas (Sidebar, Header, Breadcrumb).

### 3. Estrutura de Pastas
- `src/services`: Configuração do Axios (`api.ts`) e serviços de API (`auth.service.ts`).
- `src/components`: Componentes reutilizáveis e de layout (`AppSidebar`, `BaseForm`, etc.).
- `src/layout`: Definições dos layouts (Auth, Dashboard).
- `src/pages`: Views principais (Login, Register, Dashboard).
- `src/store`: Stores do Pinia (`auth`, `loader`).

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_BASE_URL=https://api.seudominio.com
VITE_APP_NAME=FreelancerSystem
```

## 📦 Instalação e Execução

### Instalar dependências

```sh
npm install
```

### Estrutura do Projeto

A arquitetura do projeto foi pensada para manter o código organizado e facilitar a escalabilidade. Aqui está um resumo das pastas principais:

- `public/` – arquivos estáticos servidos diretamente, como ícones e imagens.
- `src/` – código-fonte da aplicação.
  - `assets/` – arquivos de estilo e outros recursos estáticos usados pelos componentes.
  - `components/` – componentes Vue reutilizáveis, organizados por funcionalidade (base, ui, layout, forms, etc.).
  - `composables/` – hooks e utilities baseados na Composition API.
  - `config/` – configuração como flags de recurso.
  - `constants/` – constantes globais.
  - `layout/` – componentes de layout (AuthLayout, DashboardLayout) utilizados pelo router.
  - `pages/` – views de página que correspondem às rotas do aplicativo.
  - `plugins/` – inicialização de plugins do Vue, caso necessário.
  - `router/` – definição das rotas e guarda de navegação.
  - `schemas/` – definições de esquemas (por exemplo, validação de formulários).
  - `services/` – lógica de comunicação com APIs (Axios) e serviços auxiliares.
  - `store/` – stores do Pinia para gerenciamento de estado.
  - `types/` – interfaces e tipagens TypeScript compartilhadas.
  - `utils/` – funções utilitárias genéricas.
  - `views/` – agrupamento de páginas que representam conjuntos lógico de telas (HomeView, AboutView, etc.).

> 💡 **Observação:** Mantenha o código modular e crie novas pastas conforme necessário para funcionalidades adicionais.

### Lembrete Importante

Antes de enviar qualquer alteração ou criar um pull request, **sempre execute uma compilação completa** para verificar se não há erros de compilação/typagem no código:

```sh
npm run build
```

Esse passo ajudará a evitar que código quebrado seja mesclado no repositório.
