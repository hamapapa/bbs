import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/thread',
    name: 'Thread',
    component: () => import('../views/Thread.vue')
  },
  {
    path: '/comment/:thread_id',
    name: 'Comment',
    component: () => import('../views/Comment.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
