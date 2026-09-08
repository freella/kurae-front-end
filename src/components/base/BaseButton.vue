<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  columns: Array,
  fetchFunction: Function,
})

const emit = defineEmits(['edit', 'delete'])

const items = ref([])
const loading = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    const data = await props.fetchFunction()
    items.value = data
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <v-data-table
    :headers="columns"
    :items="items"
    :loading="loading"
  >
    <template #item.actions="{ item }">
      <v-btn icon="mdi-pencil" @click="$emit('edit', item)" />
      <v-btn icon="mdi-delete" @click="$emit('delete', item)" />
    </template>
  </v-data-table>
</template>