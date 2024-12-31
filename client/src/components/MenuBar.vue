
<template>
    <div v-show="showTitleArea" class="title-area">
      <dots><span>Hello World! I'm Nick a Full Stack Web Developer</span></dots>
    </div>
    <header class="menu-bar scrollbar-x">
      <div class="menu-content">
        <ul class="nav-buttons tabs">
          <nav-button path="/" is-active="true" icon="home">Home</nav-button>
          <nav-button path="/projects" icon="laptop-code">Projects</nav-button>
          <nav-button path="/sandbox" icon="truck-monster">Sandbox</nav-button>
          <nav-button path="/catwalk" icon="cat">Cat Walk</nav-button>
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
    overflow-y: hidden;
    position:sticky;
    top:0;
    z-index: 10;
}

.menu-content {
    display: inline-flex;
	  height:100%;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
	flex-wrap:nowrap;
}

ul.nav-buttons{
    display: inline-flex;
    align-items: flex-end;
    flex-wrap: nowrap;
    margin-bottom: -1px;
    gap: 2px;
    list-style: none;
	padding-left:8px;
}

.title-area{
  width: calc(100vw - 12px);
}

</style>
