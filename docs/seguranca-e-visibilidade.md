# Segurança e visibilidade dos repositórios Kurae

Os repositórios permanecem públicos para viabilizar o deploy. Código, histórico Git, mensagens
de commit, branches, pull requests, arquivos de workflow e logs de CI podem ser vistos por
qualquer pessoa. Não coloque segredos, dados pessoais ou informação comercial confidencial no
Git, em mensagens de commit ou em logs.

## Revisão do histórico

Em 27/10/2026, uma busca local percorreu os blobs de texto alcançáveis pelas branches e
referências de pull request baixadas para esta revisão. Não encontrou chaves privadas nem
tokens reconhecíveis de provedores. As ocorrências de `VITE_*` são configuração pública, e não
credenciais. A revisão encontrou estimativas financeiras em dados de projeto; esses valores
foram removidos do conteúdo desta branch. Os commits e a PR fechada que já os contêm continuam
acessíveis, portanto esta alteração não afirma que o histórico foi limpo. A varredura não
substitui os alertas de Secret Scanning do GitHub, que não puderam ser consultados pela API
nesta revisão.

Trate valores `VITE_*` como públicos porque o Vite os incorpora ao bundle do navegador. Use o
gerenciador de segredos da hospedagem para credenciais de servidor. Se uma credencial real
aparecer no histórico, revogue-a no serviço emissor; apagar o arquivo ou reescrever o histórico
não invalida uma credencial já exposta.

## Render e repositórios privados

O [Render documenta suporte a repositórios GitHub privados](https://render.com/docs/git-provider)
quando a conta conectada e a instalação GitHub do Render têm acesso ao repositório. A conexão
específica da conta Kurae não foi verificada nesta revisão. Antes de mudar a visibilidade,
confirme no painel do GitHub que `freella/kurae-front-end` está incluído em **Repository access**
da instalação Render; depois, confirme nas configurações do serviço Render que a origem e a
branch corretas continuam ligadas e faça um deploy controlado. A tarefa só deve ser considerada
concluída após essa verificação na conta real.

## Plano para voltar a repositórios privados

1. Confirme que Vercel consegue acessar o frontend privado e que a produção usa a branch correta.
2. Confirme que o Render consegue acessar o backend privado e faça um deploy controlado.
3. Revise forks públicos e requisitos de acesso da equipe; tornar um repositório privado não
   recolhe forks, clones, caches nem cópias baixadas.
4. Alinhe a janela de mudança com a equipe e altere a visibilidade nas configurações da
   organização.
5. Valide integrações, webhooks, deploys de produção, API, CI e rollback.
