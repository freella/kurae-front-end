<script setup>
import { useNotificationStore } from '@/store/notification'

const notification = useNotificationStore()
</script>

<template>
  <v-snackbar
    v-model="notification.show"
    :color="notification.color"
    timeout="3000"
  >
    {{ notification.message }}
  </v-snackbar>
</template>