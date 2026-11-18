<script setup lang="ts">
interface FormField {
  type: 'text' | 'email' | 'password' | 'select'
  label: string
  placeholder?: string
  options?: string[]
  required?: boolean
  rules?: Array<(value: unknown) => boolean | string>
}

defineProps<{
  modelValue?: string | number | null
  field: FormField
}>()

defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()
</script>

<template>
  <v-text-field
    v-if="field.type === 'text' || field.type === 'email'"
    :type="field.type"
    :label="field.label"
    :placeholder="field.placeholder"
    :required="field.required"
    :rules="field.rules"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    variant="outlined"
    color="primary"
    base-color="outline"
    bg-color="surface-variant"
    class="font-sans"
  />

  <v-text-field
    v-else-if="field.type === 'password'"
    type="password"
    :label="field.label"
    :placeholder="field.placeholder"
    :required="field.required"
    :rules="field.rules"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    variant="outlined"
    color="primary"
    base-color="outline"
    bg-color="surface-variant"
    class="font-sans"
  />

  <v-select
    v-else-if="field.type === 'select'"
    :items="field.options"
    :label="field.label"
    :placeholder="field.placeholder"
    :required="field.required"
    :rules="field.rules"
    :model-value="modelValue != null ? String(modelValue) : null"
    @update:model-value="$emit('update:modelValue', $event)"
    variant="outlined"
    color="primary"
    base-color="outline"
    bg-color="surface-variant"
    class="font-sans"
  />
</template>