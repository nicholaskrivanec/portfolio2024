<template>
  <header class="menu-bar">
    <div class="menu-content">
      <div class="nav-buttons">
        <slot></slot>
        <nav-button path="/" icon="home">Home</nav-button>
        <nav-button path="/sandbox" icon="truck-monster">Sandbox</nav-button>
      </div>

      <div class="menu-togglers">
        <toggle-switch label="Dark Mode" id="dark-mode-toggle" :checked="isDarkMode" :onChange="toggleDarkMode" />
        <toggle-switch v-if="includeIconSwitch" label="Icons" id="icon-toggle" :checked="showIcons" :onChange="toggleIconMode" />
        <toggle-switch v-if="includeColorSwitch" label="Colors" id="icon-toggle" :checked="showColors" :onChange="toggleColorMode" />
      </div>
    </div>
  </header>
</template>

<script>
  export default{
    data(){
      return {
         isDarkMode: (localStorage.getItem("darkMode") ?? "enabled") === "enabled"
         ,showIcons: (localStorage.getItem("iconMode") ?? "enabled") === "enabled"
         ,showColors: (localStorage.getItem("colorMode") ?? "enabled") === "disabled"
         
      }
    }
    ,props:{
      includeColorSwitch : { type: Boolean, required: false, default: false }
      ,includeIconSwitch : { type: Boolean, required: false, default: false }
    }
    ,emits:['toggle-icons', 'toggle-colors']
    , methods: {
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle("dark-mode", this.isDarkMode);
        localStorage.setItem("darkMode", this.isDarkMode ? "enabled" : "disabled");
      }
      ,toggleIconMode(){
        this.showIcons = !this.showIcons;
        this.$emit("toggle-icons", this.showIcons);
      }
      ,toggleColorMode(){
        this.showColors = !this.showColors;
        this.$emit("toggle-colors", this.showColors);
      }
    }
    , mounted() {
        document.body.classList.toggle("dark-mode", this.isDarkMode);
        if(!this.includeColorSwitch) {
          this.showColors = false;
          localStorage.setItem("colorMode", "disabled");
        }
    }

 }
</script>

<style scoped>
    .menu-bar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        background-color: var(--menu-background) !important;
        color: var(--menu-text);
        display: flex;
        align-items: flex-start;;
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