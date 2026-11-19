<script setup lang="ts">
import { useNotificationStore } from '@/store/notification.store'

interface NotificationStoreState {
  show: boolean
  color: string
  message: string
}

const notification = useNotificationStore() as unknown as NotificationStoreState
</script>

<template>
  <v-snackbar
    v-model="notification.show"
    :color="notification.color || 'surface-variant'"
    timeout="3000"
    rounded="lg"
    elevation="8"
    class="font-sans"
  >
    <span class="text-sm font-medium">
      {{ notification.message }}
    </span>

    <template #actions>
      <v-btn
        icon="mdi-close"
        variant="text"
        size="small"
        aria-label="Fechar notificação"
        @click="notification.show = false"
      />
    </template>
  </v-snackbar>
</template>