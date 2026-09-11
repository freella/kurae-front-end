import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/store/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      
    },
    {
      path: '/about',
      name: 'about',
 
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/Dashboard.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue'),
      meta: { layout: 'auth' }
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

export default router
