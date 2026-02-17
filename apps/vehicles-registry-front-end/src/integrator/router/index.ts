import { createRouter, createWebHistory, type RouteComponent } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: (): RouteComponent => import('../ui/views/PassengerVehiclesView.vue'),
      name: 'registry',
      path: '/',
    },
    {
      component: (): RouteComponent => import('../ui/views/PassengerVehicleCreationView.vue'),
      name: 'create',
      path: '/create',
    },
  ],
})

export default router
