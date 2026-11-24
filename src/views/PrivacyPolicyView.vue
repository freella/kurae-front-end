<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CONTACT_FORM_CONFIG, LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <div class="min-h-screen bg-deep-blue px-4 py-12 text-ice sm:px-6 lg:px-8">
    <main class="mx-auto max-w-3xl font-sans">
      <div class="mb-8">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-vibrant transition-colors hover:text-cyan-neon focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
        >
          ← Voltar para a página inicial
        </RouterLink>
      </div>

      <header class="mb-10 border-b border-navy/50 pb-6">
        <span class="mb-2 inline-block text-xs font-semibold tracking-wider text-cyan-vibrant uppercase">
          Privacidade e LGPD
        </span>
        <h1 class="font-display text-3xl font-bold text-ice sm:text-4xl">
          Política de Privacidade
        </h1>
        <p class="mt-2 text-sm text-ice/65">
          {{ LANDING_CONTENT.brand }} — Versão {{ CONTACT_FORM_CONFIG.privacy.policyVersion }}
        </p>
      </header>

      <article class="space-y-8 text-sm leading-relaxed text-ice/85 sm:text-base">
        <section class="space-y-2">
          <h2 class="font-display text-xl font-semibold text-ice">1. Coleta mínima de dados</h2>
          <p>
            Coletamos apenas os dados estritamente necessários para responder ao seu pedido de
            contato comercial: nome, e-mail, mensagem e, quando informado, telefone.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="font-display text-xl font-semibold text-ice">2. Finalidade e base legal</h2>
          <p>
            Os dados enviados pelo formulário de contato são utilizados exclusivamente para retorno
            comercial e atendimento à solicitação iniciada por você, em conformidade com a Lei Geral
            de Proteção de Dados (Lei nº 13.709/2018 — LGPD). A base legal aplicável e eventuais
            condições adicionais devem seguir a revisão jurídica formal da KURAE.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="font-display text-xl font-semibold text-ice">
            3. Compartilhamento e segurança
          </h2>
          <p>
            Os dados podem ser processados em nosso sistema de gestão de relacionamento com clientes
            (HubSpot CRM) e em camadas técnicas de proteção contra spam, sempre com tráfego
            criptografado e acesso restrito. Não comercializamos seus dados pessoais.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="font-display text-xl font-semibold text-ice">4. Direitos do titular</h2>
          <p>
            Você pode solicitar confirmação de tratamento, acesso, correção ou eliminação dos seus
            dados pessoais a qualquer momento entrando em contato pelos canais oficiais da
            {{ LANDING_CONTENT.brand }}.
          </p>
        </section>
      </article>
    </main>
  </div>
</template>
