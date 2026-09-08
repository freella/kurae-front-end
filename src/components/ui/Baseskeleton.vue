<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  loading: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <v-skeleton-loader
    v-if="loading"
    :type="type"
  />

  <slot v-else />
</template>