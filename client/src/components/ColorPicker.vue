<template>
  <label :for="id" class="color-picker" :title="varName">
    <div>{{ label }}</div>
    <!-- <div>{{ hexColor }}</div> -->
    <input type="color" v-model="hexColor" @input="updateCSSVariable" />
  </label>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore"; 

export default {
  name: "ColorPicker",
  props: {
    var: { type: String, required: true },
    label: { type: String, required: true }
  },
  setup(props) {
    const store = useUserStore();
    const defaultColor = computed(() => {
      return getCSSVariableValue(varName.value);
    });
    const hexColor = ref(defaultColor.value);

    const getCSSVariableValue = (variableName) => {
      const computedStyle = getComputedStyle(document.body);
      const value = computedStyle.getPropertyValue(variableName)?.trim();
      return value || "#ffffff";
    };
n
    const updateCSSVariable = (newValue) => {
      if (store.isDarkMode) {
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
      resetColor,
    };
  },
};
</script>
