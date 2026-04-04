import { createRouter, createWebHistory, type RouteComponent } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      children: [
        {
          component: (): RouteComponent => import('../ui/accruals-on-bank-deposits/AccrualsOnBankDepositsSection.vue'),
          name: 'accruals-on-bank-deposits',
          path: 'accruals-on-bank-deposits',
        },
        {
          component: (): RouteComponent => import('../ui/price-comparison/PriceComparisonSection.vue'),
          name: 'price-comparison',
          path: 'price-comparison',
        },
      ],
      component: HomeView,
      name: 'home',
      path: '/',
    },
    {
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: (): RouteComponent => import('../views/AboutView.vue'),
      name: 'about',
      path: '/about',
    },
  ],
})

export default router
