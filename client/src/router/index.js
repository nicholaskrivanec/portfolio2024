import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Sandbox from '../views/Sandbox.vue';
import ProjectsView from '../views/ProjectsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { keepAlive: true }
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: Sandbox,
    meta: { keepAlive: true }
  },
  {
    path: '/projects',
    name: 'projects-view',
    component: ProjectsView,
    meta: { keepAlive: true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
