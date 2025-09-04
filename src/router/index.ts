import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/components/pages/Welcome/WelcomePage.vue'
import TownPage from '@/components/pages/Town/TownPage.vue'

const routes = [
  {
    path: '/',
    component: TownPage,
  },
  {
    path: '/welcome',
    component: WelcomePage,
    meta: { hideHeader: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
