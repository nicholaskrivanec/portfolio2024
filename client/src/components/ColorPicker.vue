<template>
  <label :for="id" class="color-picker" :title="varName">
    <div>{{ label }}</div>
    <div>{{ hexColor }}</div>
    <input type="color" :id="id" v-model="hexColor" @input="updateCSSVariable" />
  </label>
</template>

<script>
  

  export default {
    name: "ColorPicker"
    ,props: {
      id: {type: String, required: true}
      ,varName: { type: String, required: true }
      ,label: {type: String, required: true }
    }
    ,data() {
      return {
        hexColor: "#ffffff"
      };
    }
    ,methods: {
      updateCSSVariable() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode)
          document.body.style.setProperty(this.varName, this.hexColor);
        else
          document.documentElement.style.setProperty(this.varName, this.hexColor);
      }
      ,getCSSVariableValue(variableName) {
        const computedStyle = getComputedStyle(document.body);
        const value = computedStyle.getPropertyValue(variableName)?.trim();
        return value || "#ffffff"; 
      }
      ,resetColor(){
        this.hexColor = this.getCSSVariableValue(this.varName);
        this.updateCSSVariable(); 
      }

    }
   ,mounted() {
      this.resetColor();
    }
  };
</script>

<style scoped>
  .color-picker {
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
  .color-picker:hover{
    background-color: var(--nav-background-hover);
    color: var(--nav-background-text-hover);
    opacity: 1!important;
  }
  .color-picker label{
    padding-right: 10px;
    cursor:pointer;
    user-select:none;
  }
  
  input[type="color"] {
    width: 50px;
    padding: 0px 4px;
    cursor:pointer;
    user-select:none;
  }

</style>
