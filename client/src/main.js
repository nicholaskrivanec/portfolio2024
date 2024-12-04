import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);

//Assets
import './assets/main.css';
import './assets/icons.css';
import './assets/profile_pic.png';

//Components
import NavButton from './components/NavButton.vue';
app.component('nav-button', NavButton);

import DetailBox from './components/DetailBox.vue';
app.component('detail-box', DetailBox);

import MenuBar from './components/MenuBar.vue';
app.component('menu-bar', MenuBar);

import NavBar from './components/NavBar.vue';
app.component('nav-bar', NavBar);

import ToggleSwitch from './components/ToggleSwitch.vue';
app.component('toggle-switch', ToggleSwitch);

import CardSlot from './components/CardSlot.vue';
app.component('card-slot', CardSlot);

import ColorPicker from './components/ColorPicker.vue';
app.component('color-picker', ColorPicker);

import FooterArea from './components/FooterArea.vue';
app.component('footer-area', FooterArea);


//Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
    faPenToSquare       ,faUser         ,faEnvelope         ,faBriefcase
    ,faHome             ,faAsterisk     ,faCircleDown       ,faMugSaucer
    ,faGraduationCap    ,faCode         ,faCaretDown        ,faCaretRight
    ,faCalendarDays     ,faTruckMonster    
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(
    faPenToSquare       ,faUser         ,faEnvelope         ,faBriefcase
    ,faHome             ,faAsterisk     ,faCircleDown       ,faMugSaucer
    ,faGraduationCap    ,faCode         ,faCaretDown        ,faCaretRight
    ,faCalendarDays     ,faInstagram    ,faFacebook         ,faLinkedin
    ,faGithub           ,faTruckMonster
); 
app.component('fa-icon', FontAwesomeIcon);


app.mount('#app');
