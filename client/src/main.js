import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

//Assets
    import './assets/main.css';
    import './assets/icons.css';

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

    import ColorPicker from './components/ColorPicker.vue';
    app.component('color-picker', ColorPicker);

    import FooterArea from './components/FooterArea.vue';
    app.component('footer-area', FooterArea);

    import ChessPreloader from './components/ChessPreloader.vue';
    app.component('chess-preloader', ChessPreloader);

    import Dots from './components/Dots.vue';
    app.component('dots', Dots);

    import Preloader from './components/Preloader.vue';
    app.component('preloader', Preloader);


//Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
    faPenToSquare       ,faUser         ,faEnvelope         ,faBriefcase
    ,faHome             ,faAsterisk     ,faCircleDown       ,faMugSaucer
    ,faGraduationCap    ,faCode         ,faCaretDown        ,faCaretRight
    ,faCalendarDays     ,faTruckMonster ,faSpinner          ,faLaptopCode
    ,faCat
} from '@fortawesome/free-solid-svg-icons';

import { faInstagram, faFacebook, faLinkedin, faGithub, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(
    faPenToSquare       ,faUser         ,faEnvelope         ,faBriefcase
    ,faHome             ,faAsterisk     ,faCircleDown       ,faMugSaucer
    ,faGraduationCap    ,faCode         ,faCaretDown        ,faCaretRight
    ,faCalendarDays     ,faInstagram    ,faFacebook         ,faLinkedin
    ,faGithub           ,faTruckMonster ,faSpinner          ,faSquareXTwitter
    ,faLaptopCode       ,faCat
); 
app.component('fa-icon', FontAwesomeIcon);
app.mount('#app');

