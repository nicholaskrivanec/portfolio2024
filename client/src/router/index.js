import { createRouter, createWebHistory } from 'vue-router';

const routes = [  
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { keepAlive: false },
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: () => import('../views/Sandbox.vue'),
    meta: { keepAlive: false },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    meta: { keepAlive: true },
  },


];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(`to: ${to.hash}, from: ${from.hash}, saved: ${savedPosition}`);
    
  if (to.hash !== from.hash && to.hash !== "#headerMenu") 
        return new Promise((resolve) => {
          setTimeout(() => {
            const scrollYContainer = document.querySelector('.body-scroll-area');
            if (scrollYContainer) {
              scrollYContainer.scrollTo({ top: 0, behavior:'instant' }, );
            }
            resolve({ top: 0 });
          }, 1000);
        })
    },
});

export default router;
