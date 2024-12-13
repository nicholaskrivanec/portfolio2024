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

<template>
  <header class="menu-bar scrollbar-x">
    <div class="menu-content">
      <ul class="nav-buttons tabs">
        <nav-button path="/" is-active="true" icon="home">Home</nav-button>
        <nav-button path="/projects" icon="laptop-code">Projects</nav-button>
        <nav-button path="/sandbox" icon="truck-monster">Sandbox</nav-button>
      </ul>

      <div class="menu-togglers">
		  <toggle-switch v-show="includeIconSwitch" label="Icons" id="icon-toggle" :checked="showIcons" :onChange="toggleIconMode" />
		  <toggle-switch v-show="includeColorSwitch" label="Colors" id="color-toggle" :checked="showColors" :onChange="toggleColorMode" />
		  <toggle-switch label="Dark Mode" id="dark-mode-toggle" :checked="isDarkMode" :onChange="toggleDarkMode" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.menu-bar {
    width: 100%;
	height: 60px;
    background-color: var(--menu-background);
    color: var(--primary-background-text);
    box-shadow: inset 0 -8px 16px -13px var(--menu-shine);
    border-top: none;
    border-bottom: solid 1px var(--menu-border);
	overflow-y: hidden;
}
.menu-bar::after{
	content:"";
	clear:both;
	display:table;
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

</style>
