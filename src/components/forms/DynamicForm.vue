<script setup lang="ts">
import type { FormSchema } from '@/types/form-schema'
import { ref } from 'vue'

const props = defineProps<{
  schema: FormSchema
}>()

const emit = defineEmits(['submit'])

const formData = ref<Record<string, any>>({})

function handleSubmit() {
  emit('submit', formData.value)
}

function handleFileChange(event: Event, fieldName: string) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formData.value[fieldName] = target.files[0]
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div
      v-for="field in schema.fields"
      :key="field.name"
      class="flex flex-col gap-1"
    >
      <label class="font-medium">{{ field.label }}</label>

      <input
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
        v-model="formData[field.name]"
        :type="field.type"
        :placeholder="field.placeholder"
        class="input"
      />

      <textarea
        v-else-if="field.type === 'textarea'"
        v-model="formData[field.name]"
        class="textarea"
      />

      <select
        v-else-if="field.type === 'select'"
        v-model="formData[field.name]"
        class="select"
      >
        <option
          v-for="opt in field.options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>

      <input
        v-else-if="field.type === 'checkbox'"
        type="checkbox"
        v-model="formData[field.name]"
      />

      <input
        v-else-if="field.type === 'date'"
        type="date"
        v-model="formData[field.name]"
      />

      <input
        v-else-if="field.type === 'file'"
        type="file"
        @change="handleFileChange($event, field.name)"
      />
    </div>

    <button class="btn-primary">
      Salvar
    </button>
  </form>
</template>