import { createRouter, createWebHistory } from 'vue-router';

const routes = [  
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: () => import('../views/Sandbox.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/projects',
    name: 'projects-view',
    component: () => import('../views/Projects.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/catwalk',
    name: 'catwalk',
    component: () => import('../views/MascotCanvas.vue'),
    meta: { keepAlive: true },
  },

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
