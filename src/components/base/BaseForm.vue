<script setup>
import { reactive, watch } from 'vue'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  fields: Array,
  initialValues: Object,
  submitFunction: Function,
})

const emit = defineEmits(['success'])

const formData = reactive({})

watch(
  () => props.initialValues,
  (values) => {
    Object.assign(formData, values || {})
  },
  { immediate: true }
)

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await props.submitFunction(formData)
    emit('success')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <BaseInput
      v-for="field in fields"
      :key="field.name"
      v-model="formData[field.name]"
      :field="field"
      class="mb-4"
    />

    <BaseButton
      type="submit"
      :loading="loading"
      label="Salvar"
      block
    />
  </v-form>
</template>