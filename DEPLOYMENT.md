# Deploy do frontend na Vercel

## Configuração do projeto

- Repositório: `freella/kurae-front-end` (GitHub).
- Branch de produção desejada: `main`, depois que as alterações aprovadas forem integradas. Enquanto o trabalho estiver em `bnd`/`dev`, usar os deploys de Preview para validação.
- Framework: Vite; diretório raiz: raiz deste repositório.
- Build: `npm run build`; saída: `dist`.
- A integração Git da Vercel publica `main` em produção e cria um preview para cada pull request. Não é necessário outro workflow de deploy.
- `vercel.json` envia rotas da SPA, como `/login` e `/dashboard`, para `index.html`.

## Variáveis de ambiente

Configurar na Vercel para **Production** e **Preview**:

| Variável | Valor |
| --- | --- |
| `VITE_API_BASE_URL` | URL HTTPS pública do backend correspondente ao ambiente, sem dados de autenticação. |

O formulário de contato e a autenticação dependem dessa API. O arquivo `.env.production` da branch `dev` é carregado pelo Vite, mas contém uma URL de exemplo. A variável configurada na Vercel deve apontar para a API real antes de publicar.

## Importação na conta Vercel

1. Na conta que será dona do projeto, instalar/autorizar a integração Vercel no GitHub da organização `freella`. Um administrador da organização pode precisar aprovar o acesso.
2. Em **Add New → Project**, selecionar o repositório público `freella/kurae-front-end`.
3. Confirmar **Framework Preset: Vite**, **Root Directory: `./`**, **Build Command: `npm run build`** e **Output Directory: `dist`**.
4. Configurar a branch de produção nas configurações Git do projeto. Não selecionar `bnd` ou `dev` como produção durante a validação.
5. Substituir `VITE_API_BASE_URL` pelo endereço real da API nos ambientes necessários; a URL de exemplo não serve para a publicação.
6. Ativar **Web Analytics** e criar um novo deploy para começar a coletar visualizações de página.

O plano Hobby permite importar o repositório público, mas a Vercel o restringe a uso pessoal e não comercial. Para a publicação comercial da Kurae e para consultar os eventos personalizados, é necessário um plano compatível. O Analytics básico de páginas pode ser validado separadamente em um projeto pessoal de teste.

## Verificação antes da publicação

1. Executar `npm ci` e `npm run build` na branch que será publicada.
2. Confirmar que o PR recebe um preview e que `/`, `/login` e `/about` carregam diretamente nesse endereço.
3. Testar a comunicação com a API no preview, incluindo envio do formulário.
4. Confirmar que um push em `main` gera um deploy de produção e repetir as verificações no domínio de produção.
5. Registrar a URL de um deploy anterior. Para testar rollback, usar a ação **Rollback** na Vercel, conferir a versão servida e depois promover novamente a versão atual.

## Web Analytics

Depois de criar o projeto, ativar **Web Analytics** no painel da Vercel e fazer um novo deploy. Conferir no painel as visualizações, origens do tráfego e dispositivos após visitas de teste. O frontend já inclui o componente de Analytics e os eventos `vitalis_cta_click` e `contact_form_submitted` (sem nome ou email). A visualização de eventos personalizados exige plano Pro ou Enterprise. O CTA da página inicial leva à seção `#contato`. Para validar o envio do formulário, a API precisa estar disponível no endereço configurado em `VITE_API_BASE_URL` e permitir a origem do frontend.
