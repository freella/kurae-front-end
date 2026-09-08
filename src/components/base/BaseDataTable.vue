<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DataTableHeader } from 'vuetify'

const props = defineProps<{
  headers: DataTableHeader[]
  items: any[]
  totalItems: number
  loading: boolean
}>()

const emit = defineEmits<{
  'update:options': [options: any]
}>()

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: []
})

watch(options, () => {
  emit('update:options', options.value)
}, { deep: true })
</script>

<template>
  <v-data-table-server
    v-model:options="options"
    :headers="headers"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    class="elevation-1"
  >

    <template #loading>
      <v-skeleton-loader type="table-row@6"></v-skeleton-loader>
    </template>

    <slot />

  </v-data-table-server>
</template>