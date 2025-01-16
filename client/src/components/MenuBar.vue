
<template>
    <div v-show="showTitleArea" class="title-area" >
      <dots>
        <div class="from-left">Hello World!</div>
        <div class="from-right">I'm Nick.</div>
        <div class="from-left">I am a Full Stack Web Developer.</div>
        <div>
          <a href="#headerMenu" class="title-button" @contextmenu.prevent @dragStart.prevent>
            <span class="dl-text">Profile</span>
            <fa-icon :icon="['fa', 'arrow-down']" />
          </a>
        </div>
      </dots>
    </div>
    <header 
      class="menu-bar scrollbar-x" 
      id="headerMenu">
      <div class="menu-content">
        <ul class="nav-buttons tabs">
          <nav-button path="/" is-active="true" icon="home" label="Home"></nav-button>
          <nav-button path="/projects" icon="laptop-code" label="Projects"></nav-button>
          <nav-button path="/sandbox" icon="truck-monster" label="Sandbox"></nav-button>
          <nav-button path="/three" icon="cat" label="Three JS"></nav-button>
        </ul>
  
        <div class="menu-togglers">
        <toggle-switch v-show="includeIconSwitch" label="Icons" id="icon-toggle" :checked="showIcons" :onChange="toggleIconMode" />
        <toggle-switch v-show="includeColorSwitch" label="Colors" id="color-toggle" :checked="showColors" :onChange="toggleColorMode" />
        <toggle-switch label="Dark Mode" id="dark-mode-toggle" :checked="isDarkMode" :onChange="toggleDarkMode" />
        </div>
      </div>
    </header>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useEventStore } from "@/stores/eventStore";
import { useUserStore } from '@/stores/userStore';

export default {
  name: "MenuBar",
  props: {
    includeColorSwitch: { type: Boolean, required: false, default: false },
    includeIconSwitch: { type: Boolean, required: false, default: false },
    showTitleArea: {type: Boolean, required: false, default: false}
  },
  setup(props, { emit }) {
    const eventStore = useEventStore();
    const store = useUserStore();
    const isDarkMode = computed({
      get: () => store.isDarkMode,
      set: (value) => {
        store.isDarkMode = value; 
        localStorage.setItem("darkMode", value ? "enabled" : "disabled");
        document.body.classList.toggle("dark-mode", value); 
        eventStore.emit("toggle-dark-mode", value); 
      }
    });
    const iconMode = computed({
      get: () => store.iconMode,
      set: (value) => {
        store.iconMode = value; 
        localStorage.setItem("iconMode", value ? "enabled" : "disabled");
        eventStore.emit("toggle-icons", value); 
      }
    }); 
    const colorMode = computed({
      get: () => store.colorMode,
      set: (value) => {
        store.colorMode = value; 
        localStorage.setItem("colorMode", value ? "enabled" : "disabled");
        eventStore.emit("toggle-colors", value); 
      }
    }); 

    const showIcons = ref(iconMode);
    const showColors = ref(colorMode);

    onMounted(() => {
      document.body.classList.toggle("dark-mode", isDarkMode.value);
    });

    return {
      isDarkMode,
      showIcons,
      showColors,
      toggleDarkMode: () => isDarkMode.value = !isDarkMode.value,
      toggleIconMode: () => iconMode.value = !iconMode.value,
      toggleColorMode: () => colorMode.value = !colorMode.value
    };
  },
};
</script>


<style scoped>
.menu-bar {
    width: 100%;
    height: 60px;
    background-color: var(--menu-background);
    color: var(--primary-background-text);
    box-shadow: inset -1px -5px 16px -13px var(--menu-shine);
    border-top: none;
    border-bottom: solid 1px var(--menu-border);
    position:sticky;
    top:0;
    z-index: 10;
    transform: scale(1); /* Prevent scaling */
    transform-origin: top left; /* Prevent unwanted scaling effects */
}

.menu-content {
    display: inline-flex;
    width: calc(100% - 15px);
    height: calc(100% - 1px);
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: nowrap;
}
ul.nav-buttons{
    display: inline-flex;
    align-items: flex-end;
    flex-wrap: nowrap;
    margin-bottom: -1px;
    gap: 2px;
    list-style: none;
	  padding-left:8px;
    height:60px;
}

.from-left, .from-right {
    animation-duration: 1.4s;
    animation-timing-function: cubic-bezier(0.21, 1.11, 0.81, 0.99);
}
.from-left {
  animation-name: moveInLeft;
}
.from-right {
  animation-name: moveInRight;
}
.from-bottom {
  animation-name: moveInBottom;
}
a.title-button {
    cursor: pointer;
    animation: moveInBottom 0.7s 1.2s;
    animation-fill-mode: backwards;
    animation-timing-function: cubic-bezier(0.21, 1.11, 0.81, 0.99);
    text-decoration: none;
    padding: 6px; /* 0.8rem 3rem*/
    border: 2px solid var(--emerald-cream);
    border-radius: 14px; /*2px*/
    font-size: 23px;
    font-weight: normal;
    background-color: var(--box-shadow-dark);
    margin-top: 10px;/*2.4rem*/
    height:45px;/* 17.5rem */
    width:125px;/* 4.8rem */
    position: relative;
    justify-content: center;
    display:flex;
    user-select:none;
    pointer-events: all;
    -webkit-user-drag: none;
}

.title-button:before, .title-button:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    height: 45px;
    width: 125px;
    border-radius: 16px;
    border: 2px solid var(--emerald-cream);
    filter: blur(0);
    transform-origin: 50%;
    z-index: 29;
}

.title-button:hover:before, .title-button:hover:after {
    border-color: transparent;
    filter: blur(2px);
    transform: scaleX(1.3) scaleY(2.2);
    transition: 800ms transform ease, 1900ms blur ease, 700ms border-color ease;
    pointer-events: none;
}

.title-button:hover {
    transform: translateY(-2px);
}
.title-button:hover:after {
    transition-delay: 150ms;
}
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem);
  }
  100% {
      opacity: 1;
      transform: translateX(0);
  }
}
@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }
  100% {
      opacity: 1;
      transform: translateX(0);
  }
}
@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(4rem);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
}
</style>
