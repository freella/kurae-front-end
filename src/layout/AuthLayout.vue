<script setup lang="ts">


import { computed } from 'vue';

const props = defineProps<{
  headerText?: string;

  background?: string;
}>();


const containerStyle = computed(() => ({
  minHeight: '100vh',
  background: props.background || 'linear-gradient(135deg, #0f172a, #1e293b)',
}));
</script>

<template>

  <v-container fluid class="auth-layout" :style="containerStyle">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="5" lg="4">
        <div v-if="props.headerText" class="auth-header mb-6">
          {{ props.headerText }}
        </div>

        <slot />

        <slot name="footer" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

.auth-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.auth-header {
  text-align: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>