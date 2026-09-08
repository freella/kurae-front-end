<template>
  <template v-if="errorStore.hasError">
    <div class="error-boundary">
      <div class="error-card">
        <h1>Algo deu errado</h1>
        <p class="error-message">{{ errorStore.message }}</p>

        <p v-if="errorStore.errorDetails" class="error-details">
          Detalhes: {{ errorStore.errorDetails }}
        </p>

        <button @click="reloadPage">Recarregar página</button>
      </div>
    </div>
  </template>

  <template v-else>
    <v-app>
      <router-view />
      <GlobalSnackbar />
      <GlobalLoader />
    </v-app>    
  </template>
</template>

<script setup lang="ts">
import GlobalSnackbar from '@/components/global/GlobalSnackbar.vue'
import GlobalLoader from '@/components/global/GlobalLoader.vue'
import { useErrorStore } from '@/store/error.store'

const errorStore = useErrorStore()

function reloadPage() {
  window.location.reload()
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.Logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .Logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.error-card {
  width: 100%;
  max-width: 500px;
  padding: 32px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  text-align: center;
  backdrop-filter: blur(6px);
}

.error-card h1 {
  margin-bottom: 12px;
  color: white;
  font-size: 2rem;
  font-weight: 700;
}

.error-message {
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.5;
}

.error-details {
  margin-bottom: 24px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9rem;
  line-height: 1.4;
  word-break: break-word;
}

.error-card button {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: white;
  color: #111827;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.error-card button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>