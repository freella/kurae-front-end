<script setup lang="ts">
import { useLoaderStore } from '@/store/loader.store'
import kuraeSymbol from '@/assets/logos/kurae/Kurae_Logo_V01.svg'

const loader = useLoaderStore()
</script>

<template>
  <v-overlay
    :model-value="loader.loading"
    scrim="#04152b"
    class="align-center justify-center backdrop-blur-xs"
    persistent
  >
    <div
      class="flex flex-col items-center justify-center rounded-2xl border border-navy/50 bg-graphite/90 p-6 shadow-2xl"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="76"
        width="3"
      >
        <img
          :src="kuraeSymbol"
          alt="Carregando"
          class="h-8 w-8 animate-pulse object-contain"
        />
      </v-progress-circular>
    </div>
  </v-overlay>
</template>