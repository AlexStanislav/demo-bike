import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAppStore } from '../stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products/:id',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/product/:brand/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  store.toggleScreenLoader(true)
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    store.toggleScreenLoader(false)
    document.body.style.overflow = 'auto'
  }, 2000)
  window.scrollTo(0, 0)
  next()
})

export default router
