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
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/billeterie',
      name: 'BilleterieComposent',
      component: () => import('../views/BilleterieView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'AdminComposent',
      component: () => import('../views/AdminView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    // Récuperer l'info de si l'utilisateur est un admin
    const isAuthenticated = sessionStorage.getItem("isAdmin")// Logique d'authentification ici

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

router.beforeEach((to, from, next) => {
  const isConnected = sessionStorage.getItem('loggedIn');
  console.log(isConnected)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // La route nécessite une authentification
    if (isConnected) {
      // L'utilisateur est connecté, poursuivre la navigation
      next();
    } else {
      // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
      next('/');
    }
  } else {
    // La route n'a pas besoin d'authentification, poursuivre la navigation
    next();
  }
});

export default router
