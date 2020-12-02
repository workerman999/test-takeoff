import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {auth: false},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {auth: true},
    component: () => import('../views/Home.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const authUser = store.getters.getUser.auth;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !authUser) {
    next('/');
  } else if (!requireAuth && authUser) {
    next('/home');
  } else {
    next();
  }
});

export default router
