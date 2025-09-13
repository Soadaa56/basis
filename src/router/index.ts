import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/pages/Welcome/WelcomePage.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import VillagePage from '@/pages/Village/VillagePage.vue'
import MagicPage from '@/pages/Magic/MagicPage.vue'
import SettingsPage from '@/pages/Settings/SettingsPage.vue'
import NotFound from '@/pages/NotFound.vue'
import { hasSaveFile } from '@/utils/saveFile'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: VillagePage },
      { path: 'magic', component: MagicPage },
      { path: 'settings', component: SettingsPage },
    ],
    beforeEnter: () => {
      // no save file detected
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
