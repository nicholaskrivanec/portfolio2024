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
    import Preloader from './components/Preloader.vue';
    app.component('preloader', Preloader);

    import Dots from './components/Dots.vue';
    app.component('dots', Dots);

    import NavButton from './components/NavButton.vue';
    app.component('nav-button', NavButton);

    import MenuBar from './components/MenuBar.vue';
    app.component('menu-bar', MenuBar);

    import ToggleSwitch from './components/ToggleSwitch.vue';
    app.component('toggle-switch', ToggleSwitch);

    import FooterArea from './components/FooterArea.vue';
    app.component('footer-area', FooterArea);

    import DetailRow from './components/DetailRow.vue';
    app.component('detail-row', DetailRow);

    import DetailRows from './components/DetailRows.vue';
    app.component('detail-rows', DetailRows);

    import About from './components/About.vue';
    app.component('about', About);

    import ThreeRenderer from './components/ThreeRenderer.vue';
    app.component('three-renderer', ThreeRenderer);

//Font Awesome Icons
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { 
        faPenToSquare       ,faUser         ,faEnvelope         ,faBriefcase
        ,faHome             ,faAsterisk     ,faCircleDown       ,faMugSaucer
        ,faGraduationCap    ,faCode         ,faCaretDown        ,faCaretRight
        ,faCalendarDays     ,faTruckMonster ,faSpinner          ,faLaptopCode
        ,faCat              ,faArrowDown
    } from '@fortawesome/free-solid-svg-icons';

    import { faInstagram, faFacebook, faLinkedin, faGithub, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

    library.add(
        faPenToSquare       ,faUser         ,faEnvelope         ,faBriefcase
        ,faHome             ,faAsterisk     ,faCircleDown       ,faMugSaucer
        ,faGraduationCap    ,faCode         ,faCaretDown        ,faCaretRight
        ,faCalendarDays     ,faInstagram    ,faFacebook         ,faLinkedin
        ,faGithub           ,faTruckMonster ,faSpinner          ,faSquareXTwitter
        ,faLaptopCode       ,faCat          ,faArrowDown
    ); 
app.component('fa-icon', FontAwesomeIcon);
app.mount('#app');

