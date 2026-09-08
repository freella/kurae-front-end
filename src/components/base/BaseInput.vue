<script setup>
defineProps({
  modelValue: [String, Number],
  field: Object,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <v-text-field
    v-if="field.type === 'text' || field.type === 'email'"
    :type="field.type"
    :label="field.label"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    variant="outlined"
  />

  <v-text-field
    v-else-if="field.type === 'password'"
    type="password"
    :label="field.label"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    variant="outlined"
  />

  <v-select
    v-else-if="field.type === 'select'"
    :items="field.options"
    :label="field.label"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    variant="outlined"
  />
</template>