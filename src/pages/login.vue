<template>
  <v-container class="mt-12" max-width="400">
    <v-card>
      <v-card-title>Entrar</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="formData.email"
            label="E-mail"
            type="email"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            required
          />

          <v-text-field
            v-model="formData.password"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            required
          />

          <v-checkbox
            v-model="formData.rememberMe"
            label="Lembrar-me"
          />

          <v-alert v-if="error" type="error" density="compact" class="mt-4 mb-2">
            {{ error }}
          </v-alert>

          <v-btn
            type="submit"
            color="primary"
            block
            class="mt-6"
            :loading="loading"
          >
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const loading = ref(false);
const error = ref(null);

const formData = ref({
  email: '',
  password: '',
  rememberMe: false,
});

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    await authStore.login({
      email: formData.value.email,
      password: formData.value.password,
    });

    const redirect = route.query.redirect || '/dashboard';
    router.push(redirect);

  } catch (err) {
    console.error('❌ Erro no login:', err);
    error.value =
      err?.response?.data?.message ||
      'E-mail ou senha inválidos. Tente novamente.';
  } finally {
    loading.value = false;
  }
};
</script>