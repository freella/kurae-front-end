<script setup>
defineEmits(['toggleSidebar'])
</script>

<template>
  <v-app-bar app flat elevation="1">
    <v-app-bar-nav-icon @click="$emit('toggleSidebar')" />

    <v-toolbar-title>Admin Panel</v-toolbar-title>

    <v-spacer />

    <v-btn icon="mdi-bell-outline" />
    <v-btn icon="mdi-account-circle" />
  </v-app-bar>
</template>