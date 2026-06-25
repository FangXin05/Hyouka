import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/OfficalView',
    name: 'OfficalView',
    component: () => import('../views/OfficalView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/AssociatedView',
    name: 'AssociatedView',
    component: () => import('../views/AssociatedView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DiscussView',
    name: 'DiscussView',
    component: () => import('../views/DiscussView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  if (currentUser) return true
  ElMessage.warning('请先登录后再访问')
  return false
})

export default router
