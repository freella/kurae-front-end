<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const items = route.matched.map(r => ({
  title: r.meta?.title || r.name,
  disabled: r.path === route.path,
}))
</script>

<template>
  <v-breadcrumbs :items="items" class="mb-4" />
</template>