import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/store/auth.store'
import { setupSeo } from '@/composables/useSeo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        seo: {
          title: 'Gestão de saúde e bem-estar',
          description: 'Kurae: organize sua saúde e bem-estar em um só lugar, de forma simples e segura.',
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        seo: {
          title: 'Sobre',
          description: 'Conheça o Kurae, nossa missão e como ajudamos você a cuidar da sua saúde.',
        },
      },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/Dashboard.vue'),
      meta: { requiresAuth: true, seo: { title: 'Dashboard', noindex: true } }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: { layout: 'auth', seo: { title: 'Entrar', noindex: true } }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue'),
      meta: { layout: 'auth', seo: { title: 'Criar conta', noindex: true } }
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  if (
    (to.name === 'login' || to.name === 'register') &&
    authStore.isAuthenticated
  ) {
    return { name: 'dashboard' }
  }

//  if (to.path === '/' && authStore.isAuthenticated) {
//    return { name: 'dashboard' }
//  }
})

setupSeo(router)

export default router
