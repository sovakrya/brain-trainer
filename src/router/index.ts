import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: () => import('../views/SettingsPage.vue'),
    },

    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GamePage.vue'),
    },
  ],
})

export default router
