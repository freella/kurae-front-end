<script setup lang="ts">
// the sidebar accepts a v-model and exposes a named slot called "footer"
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// declare slots for TypeScript
const slots = defineSlots<{
  footer?: () => any;
}>();
</script>

<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    app
    rail
  >
    <v-list>
      <v-list-item to="/dashboard" title="Dashboard" prepend-icon="mdi-view-dashboard" />
      <v-list-item to="/users" title="Usuários" prepend-icon="mdi-account-group" />
    </v-list>

    <!-- named slot that consumers (e.g. DashboardLayout) can populate -->
    <slot name="footer" />
  </v-navigation-drawer>
</template>