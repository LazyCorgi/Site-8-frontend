import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useUserSettings } from '@/stores/userSettings'
// import NoticesView from '../views/NoticesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/notices',
      name: 'notices',
      components: {
        default: () => import('@/views/NoticesView.vue'),
      },
    },
    {
      path: '/notice-create',
      name: 'notice-create',
      components: {
        default: () => import('@/views/NoticeCeateView.vue'),
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
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue'),
      meta: { layout: 'none' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = useUserSettings()

  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !user.token) {
    return next('/login')
  }

  next()
})

export default router
