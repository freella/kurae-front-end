<script setup lang="ts">

import { ref, watch, computed } from 'vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';

const props = defineProps<{
  initialDrawer?: boolean;
  mainClass?: string;
  appTitle?: string;
}>();

// give types for all the named slots we use in the template
const slots = defineSlots<{
  default?: () => any;
  'header-extra'?: () => any;
  'sidebar-footer'?: () => any;
  footer?: () => any;
}>();

const drawer = ref(props.initialDrawer ?? true);

watch(() => props.initialDrawer, (v) => {
  if (v !== undefined) drawer.value = v;
});

const mainClasses = computed(() => ['pa-6', props.mainClass].filter(Boolean).join(' '));

const emit = defineEmits<{
  (e: 'drawer-toggled', open: boolean): void;
}>();

const toggleSidebar = () => {
  drawer.value = !drawer.value;
  emit('drawer-toggled', drawer.value);
};
</script>

<template>
  <v-app>
    <AppSidebar v-model="drawer">
      <template #footer>
        <slot name="sidebar-footer" />
      </template>
    </AppSidebar>

    <v-main :class="mainClasses">
      <AppHeader
        @toggleSidebar="toggleSidebar"
        :title="props.appTitle"
      >
        <slot name="header-extra" />
      </AppHeader>

      <AppBreadcrumb />

      <div class="dashboard-content">
        <slot />
      </div>

      <slot name="footer" />
    </v-main>
  </v-app>
</template>

<style scoped>
.dashboard-content {
  min-height: calc(100vh - 64px /* header */ - 48px /* breadcrumb */);
}
</style>