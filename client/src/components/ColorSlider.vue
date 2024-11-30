<template>
  <label for="colorPicker" class="colorslider">
    <div>{{ label }}</div>
    <div>{{ hexColor }}</div>
    <input id="colorPicker" type="color" v-model="hexColor" @input="updateCSSVariable" />
  </label>
</template>

<script>
export default {
  name: "ColorPicker",
  props: {
    varName: { type: String, required: true }, 
    label: {type: String, required: true }
  },
  data() {
    return {
      hexColor: "#ffffff"
    };
  },
  methods: {
    updateCSSVariable() {
      document.documentElement.style.setProperty(this.varName, this.hexColor);
    }
    ,getCSSVariableValue(variableName) {
      const computedStyle = getComputedStyle(document.body);
      const value = computedStyle.getPropertyValue(variableName)?.trim();
      return value || "#ffffff"; 
    }
  },
  mounted() {
    this.hexColor = this.getCSSVariableValue(this.varName);
    this.updateCSSVariable(); 
  }
};
</script>

<style>
  


  .colorslider {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 15px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    width: 100%;
  }
  .colorslider:hover{
    background-color: var(--nav-background-hover);
    color: var(--nav-background-text-hover);
    opacity: 1!important;
  }
  .colorslider label{
    padding-right: 10px;
    cursor:pointer;
    user-select:none;
  }
  
  #colorPicker {
    width: 50px;
    padding: 0px 4px;
    cursor:pointer;
    user-select:none;
  }

  
  nav {
    height: calc(100% - 50px);
    width: 88px;
    position: fixed;
    left: 0;
    top: 66px;
    bottom: 116px;
    font-size: 8pt;
    overflow-y: auto;
    background-color: var(--nav-background);
  }

</style>
