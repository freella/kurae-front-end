import { defineStore } from 'pinia';
import { ref } from 'vue';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);

  const addNotification = (message: string, type: NotificationType = 'info') => {
    const id = Date.now();
    notifications.value.push({ id, message, type });
    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }, 5000); // Remove after 5 seconds
  };

  return { notifications, addNotification };
});