import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ConnectionComposent',
      component: () => import('../views/ConnectionView.vue')
    },
    {
      path: '/home',
      name: 'HomeComposent',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/billeterie',
      name: 'BilleterieComposent',
      component: () => import('../views/BilleterieView.vue')
    },
    {
      path: '/admin',
      name: 'AdminComposent',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    // Récuperer l'info de si l'utilisateur est un admin
    const isAuthenticated = true// Logique d'authentification ici

    if(!isAuthenticated) {
      // Redirigez l'utilisateur vers une autre page ou affichez un message d'erreur
      next('/home');
    } else {
      // L'utilisateur est authentifié, autorisez l'accès à l'URL restreinte
      next();
    }
  } else {
    // Laissez l'accès à toutes les autres URLs
    next();
  }
});

export default router
