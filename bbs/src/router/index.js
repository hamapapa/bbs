import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/thread',
    name: 'Thread',
    component: () => import('../views/Thread.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/comment/:thread_id',
    name: 'Comment',
    component: () => import('../views/Comment.vue'),
    props: true,
    meta: { requireAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth) && !store.state.isLogined) {
    next({ path: '/' });
  } else {
    next();
  }
})

export default router
