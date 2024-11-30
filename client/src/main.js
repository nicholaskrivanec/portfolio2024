import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
import './assets/home.css';
import './assets/icons.css';
import './assets/profile_pic.png';


const app = createApp(App);

app.use(router);

app.mount('#app');
