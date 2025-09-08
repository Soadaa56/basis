import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/pages/Welcome/WelcomePage.vue'
import TownPage from '@/pages/Village/VillagePage.vue'
import NotFound from '@/pages/NotFound.vue'
import { hasSaveFile } from '@/utils/saveFile'

const routes = [
  {
    path: '/',
    component: TownPage,
    beforeEnter: () => {
      if (!hasSaveFile()) {
        return { path: '/welcome' }
      }
    },
  },
  {
    path: '/welcome',
    component: WelcomePage,
    meta: { hideHeader: true },
  },
  // Catch-all for missing route
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
