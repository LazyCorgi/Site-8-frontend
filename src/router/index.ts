import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// import NoticesView from '../views/NoticesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
      },
    },
    {
      path: '/notices',
      name: 'notices',
      components: {
        default: () => import('@/views/NoticesView.vue'),
      },
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: () => import('@/views/AboutView.vue'),
      },
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' },
    },
  ],
})

export default router
