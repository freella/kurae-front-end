<template>
  <NavBar />

  <v-container class="mt-12" max-width="400">
    <v-card>
      <v-card-title>Cadastrar</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="formData.name"
            label="Nome Completo"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            required
          />

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

          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirmar Senha"
            type="password"
            prepend-inner-icon="mdi-lock-check"
            variant="outlined"
            required
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
            Criar Conta
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="goToLogin">Já possui conta? Entrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <Footer />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/auth.service';
import NavBar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';

const router = useRouter();

const loading = ref(false);
const error = ref(null);

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const handleRegister = async () => {
  loading.value = true;
  error.value = null;

  if (formData.password !== formData.confirmPassword) {
    error.value = 'As senhas não coincidem.';
    loading.value = false;
    return;
  }

  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  try {
    await register(payload);
    router.push({ name: 'Login', query: { registered: 'true' } });
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao registrar. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push({ name: 'Login' });
};
</script>