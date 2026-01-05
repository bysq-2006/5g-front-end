import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import SignalSampling from '@/pages/SignalSampling/SignalSampling.vue'
import AIDetection from '@/pages/AIDetection/AIDetection.vue'
import PatrolReport from '@/pages/PatrolReport/PatrolReport.vue'
import SystemSettings from '@/pages/SystemSettings/SystemSettings.vue'
import Login from '@/pages/Login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
      component: AIDetection,
      redirect: '/ai-detection/realtime',
      children: [
        {
          path: 'realtime',
          name: 'RealtimeMonitor',
          component: () => import('@/pages/AIDetection/contents/VideoMonitor/RealtimeMonitor.vue')
        },
        {
          path: 'offline',
          name: 'OfflinePlayback',
          component: () => import('@/pages/AIDetection/contents/VideoMonitor/OfflinePlayback.vue')
        }
      ]
    },
    {
      path: '/patrol-report',
      name: 'PatrolReport',
      component: PatrolReport
    },
    {
      path: '/system-settings',
      name: 'SystemSettings',
      component: SystemSettings,
      redirect: '/system-settings/language',
      children: [
        {
          path: 'language',
          name: 'LanguageSettings',
          component: () => import('@/pages/SystemSettings/contents/LanguageSettings.vue')
        },
        {
          path: 'personnel',
          name: 'PersonnelManagement',
          component: () => import('@/pages/SystemSettings/contents/PersonnelManagement.vue')
        },
        {
          path: 'model',
          name: 'ModelManagement',
          component: () => import('@/pages/SystemSettings/contents/ModelManagement.vue')
        },
        {
          path: 'system',
          name: 'SystemConfig',
          component: () => import('@/pages/SystemSettings/contents/SystemConfig.vue')
        }
      ]
    }
  ],
})

// 路由守卫：检查登录
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router
