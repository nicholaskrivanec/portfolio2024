import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sandbox from '../views/Sandbox.vue'
import ProjectsView from '../views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path: '/sandbox', 
      name: 'sandbox',
      component: Sandbox
    },{
      path: '/projects', 
      name: 'projects-view',
      component: ProjectsView
    }]
})

export default router
