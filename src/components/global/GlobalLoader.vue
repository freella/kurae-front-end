<script setup>
import { useLoaderStore } from '@/store/loader'

const loader = useLoaderStore()
</script>

<template>
  <v-overlay
    :model-value="loader.loading"
    class="align-center justify-center"
    persistent
  >
    <v-progress-circular
      indeterminate
      size="64"
    />
  </v-overlay>
</template>