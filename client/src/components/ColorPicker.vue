<template>
  <label :for="id" class="color-picker" :title="varName">
    <div>{{ label }}</div>
    <!-- <div>{{ hexColor }}</div> -->
    <input type="color" :id="id" v-model="hexColor" @input="updateCSSVariable" />
  </label>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";

export default {
  name: "ColorPicker",
  props: {
    id: { type: String, required: true },
    varName: { type: String, required: true },
    label: { type: String, required: true },
  },
  setup(props) {
    const hexColor = ref("#ffffff");
    const defaultColor = computed(() => {
      return getCSSVariableValue(varName.value);
    });

    const getCSSVariableValue = (variableName) => {
      const computedStyle = getComputedStyle(document.body);
      const value = computedStyle.getPropertyValue(variableName)?.trim();
      return value || "#ffffff";
    };

    const updateCSSVariable = () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      if (isDarkMode) {
        document.body.style.setProperty(props.varName, hexColor.value);
      } else {
        document.documentElement.style.setProperty(props.varName, hexColor.value);
      }
    };

    const resetColor = () => {
      hexColor.value = getCSSVariableValue(props.varName);
      updateCSSVariable();
    };

    // Watch the hexColor value and update the CSS variable whenever it changes
    watch(hexColor, updateCSSVariable);

    onMounted(() => {
      resetColor();
    });

    return {
      hexColor,
      defaultColor,
      updateCSSVariable,
      resetColor
    };
  },
};
</script>
