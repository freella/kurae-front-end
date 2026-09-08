<script setup lang="ts">
import { ref } from 'vue'
import { uploadFile } from '@/services/uploadService'

const emit = defineEmits(['uploaded'])

const file = ref<File | null>(null)
const preview = ref<string | null>(null)
const loading = ref(false)

const handleFileChange = (event: any) => {
  const selected = event.target.files[0]

  if (!selected) return

  file.value = selected

  if (selected.type.startsWith('image')) {
    preview.value = URL.createObjectURL(selected)
  }
}

const handleUpload = async () => {
  if (!file.value) return

  loading.value = true

  try {
    const result = await uploadFile(file.value)

    emit('uploaded', result)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>

    <v-file-input
      label="Selecionar arquivo"
      prepend-icon="mdi-paperclip"
      @change="handleFileChange"
    />

    <v-img
      v-if="preview"
      :src="preview"
      max-height="200"
      class="mt-4"
    />

    <v-btn
      class="mt-4"
      color="primary"
      :loading="loading"
      @click="handleUpload"
    >
      Upload
    </v-btn>

  </div>
</template>