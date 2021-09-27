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
    path: '/friend',
    name: 'friend',
    component: () => import(/* webpackChunkName: "myfriend" */ '@/views/MyFriend.vue'),
    // props: (route) =>{
    //   const id = Number(route.params.id)
    //   return isNaN( id )? { id: 1 } : { id }
    // }
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
