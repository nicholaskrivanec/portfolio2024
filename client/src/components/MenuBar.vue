<template>
  <header class="menu-bar">
    <div class="menu-content">
      <div class="nav-buttons">
        <slot></slot>
        <nav-button path="/" icon="home">Home</nav-button>
        <nav-button path="/sandbox" icon="truck-monster">Sandbox</nav-button>
        <nav-button path="/projects" icon="laptop-code">Projects</nav-button>
      </div>

      <div class="menu-togglers">
        <toggle-switch label="Dark Mode" id="dark-mode-toggle" :checked="isDarkMode" :onChange="toggleDarkMode" />
        <toggle-switch v-show="includeIconSwitch" label="Icons" id="icon-toggle" :checked="showIcons" :onChange="toggleIconMode" />
        <toggle-switch v-show="includeColorSwitch" label="Colors" id="color-toggle" :checked="showColors" :onChange="toggleColorMode" />
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useEventStore } from "@/stores/eventStore";

export default {
  name: "MenuBar",
  props: {
    includeColorSwitch: { type: Boolean, required: false, default: false },
    includeIconSwitch: { type: Boolean, required: false, default: false },
  },
  setup(props, { emit }) {
    const eventStore = useEventStore();
    const isDarkMode = ref(localStorage.getItem("darkMode") === "enabled");
    const iconMode = ref(localStorage.getItem("iconMode") === "enabled");
    const colorMode = ref(localStorage.getItem("colorMode") === "enabled");

    const showIcons = ref(iconMode);
    const showColors = ref(colorMode);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle("dark-mode", isDarkMode.value);
      localStorage.setItem("darkMode", isDarkMode.value ? "enabled" : "disabled");
    };

    const toggleIconMode = () => {
      iconMode.value = !iconMode.value;
      localStorage.setItem("iconMode", iconMode.value ? "enabled" : "disabled");
      eventStore.emit("toggle-icons", iconMode.value);
    };

    const toggleColorMode = () => {
      colorMode.value = !colorMode.value;
      localStorage.setItem("colorMode", colorMode.value ? "enabled" : "disabled");
      eventStore.emit("toggle-colors", colorMode.value);
    };

    onMounted(() => {
      document.body.classList.toggle("dark-mode", isDarkMode.value);
    });

    return {
      isDarkMode,
      showIcons,
      showColors,
      toggleDarkMode,
      toggleIconMode,
      toggleColorMode,
    };
  },
};
</script>

<style scoped>
.menu-bar {
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 30px;
  min-height: 1.6666667em;
  background-color: var(--menu-background) !important;
  color: var(--menu-text);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px var(--box-shadow-dark);
}

.menu-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  column-gap: 8px;
}

.menu-title {
  font-size: 18px;
  font-weight: bold;
  display: inline;
}
</style>
