import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import SignalSampling from '@/pages/SignalSampling/SignalSampling.vue'
import AIDetection from '@/pages/AIDetection/AIDetection.vue'
import PatrolReport from '@/pages/PatrolReport/PatrolReport.vue'
import SystemSettings from '@/pages/SystemSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/signal-sampling',
      name: 'SignalSampling',
      component: SignalSampling
    },
    {
      path: '/ai-detection',
      name: 'AIDetection',
      component: AIDetection
    },
    {
      path: '/patrol-report',
      name: 'PatrolReport',
      component: PatrolReport
    },
    {
      path: '/system-settings',
      name: 'SystemSettings',
      component: SystemSettings
    }
  ],
})

export default router
