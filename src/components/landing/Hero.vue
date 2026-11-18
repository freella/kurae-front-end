<script setup lang="ts">
import { track } from '@vercel/analytics'

const handlePrimaryAction = () => {
  try {
    track('vitalis_cta_click')
  } catch {
  }
}
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-navy/30 bg-gradient-to-b from-dark-blue/60 to-deep-blue py-20 text-ice lg:py-32"
  >
    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div class="text-center lg:col-span-7 lg:text-left">
          <span
            class="mb-6 inline-flex items-center rounded-full border border-cyan-vibrant/30 bg-petrol/70 px-3.5 py-1 font-sans text-xs font-medium text-turquoise"
          >
            Plataforma Digital Vitalis • Gestão & IA
          </span>

          <h1
            class="mb-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-ice sm:text-5xl lg:text-6xl"
          >
            Gestão Clínica Inteligente
            <span class="text-cyan-vibrant">&</span> Interoperabilidade em Saúde
          </h1>

          <p
            class="mx-auto mb-8 max-w-2xl font-sans text-lg text-ice/80 sm:text-xl lg:mx-0"
          >
            Unimos a robustez da gestão hospitalar tradicional com triagem
            assistida por IA, prontuário por voz e integração nativa com
            equipamentos de exames.
          </p>

          <div
            class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#contato"
              @click="handlePrimaryAction"
              class="cursor-pointer rounded-xl bg-cyan-vibrant px-8 py-4 text-center font-sans font-semibold text-deep-blue shadow-lg shadow-cyan-vibrant/25 transition-all hover:-translate-y-0.5 hover:bg-cyan-neon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
            >
              Experimente o Vitalis
            </a>
            <a
              href="#sobre"
              class="rounded-xl border border-navy bg-graphite/90 px-8 py-4 text-center font-sans font-semibold text-ice transition-all hover:-translate-y-0.5 hover:border-sky-electric hover:bg-petrol/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
            >
              Conhecer a Solução
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div
            class="relative rounded-2xl border border-navy/60 bg-graphite/90 p-6 shadow-2xl backdrop-blur-sm"
          >
            <div
              class="absolute -top-3 -right-3 rounded-full bg-cyan-vibrant px-3 py-1 font-sans text-xs font-bold tracking-wider text-deep-blue uppercase"
            >
              IA Ativa
            </div>
            <div class="space-y-4">
              <div class="h-3 w-1/3 rounded bg-petrol"></div>
              <div
                class="flex min-h-24 flex-col justify-center rounded-xl border border-petrol bg-deep-blue/80 p-4"
              >
                <p class="mb-1 font-sans text-xs text-ice/65">
                  Prontuário Inteligente (Scribing)
                </p>
                <p class="font-mono text-sm text-turquoise">
                  "Paciente felino apresentando emese persistente há 48h..."
                </p>
              </div>
              <div class="flex items-center justify-between pt-2">
                <span class="font-sans text-xs text-ice/65"
                  >Status: Sincronizado</span
                >
                <span
                  class="h-2 w-2 animate-pulse rounded-full bg-cyan-neon"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>