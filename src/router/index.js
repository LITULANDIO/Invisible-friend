import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const isAuthenticatedGuard = async (to, from, next) =>{
  const { ok } = await store.dispatch('auth/checkAuthentication')
  if(ok) next()
  else next({ name: 'login' })
}

const routes = [
  {
    path: '/',
    beforeEnter: [ isAuthenticatedGuard ],
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/:id',
    beforeEnter: [ isAuthenticatedGuard ],
    name: 'friend',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/accept',
    name: 'accept',
    component: () => import(/* webpackChunkName: "acceptFriend" */ '@/views/AcceptFriend.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Login.vue')
  },
  
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
