<template>
  <div>
    <h1>Root Level CSS Variables</h1>
    <ul>
      <li v-for="(value, key) in rootVariables" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'RootVariablesComponent',
  setup() {
    const rootVariables = ref({});

    const fetchRootVariables = () => {
      const variables = {};

      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) 
            if (rule.selectorText === ':root') 
              for (const property of rule.style) 
                if (property.startsWith('--')) 
                  variables[property] = style.getPropertyValue(property).trim();
          
        } catch (e) {
          console.warn('Cannot access stylesheet: ', sheet.href, e);
        }
      }

      rootVariables.value = variables;
    };

    onMounted(fetchRootVariables);

    return {
      rootVariables,
    };
  },
};
</script>

<style>
/* Add some styling for the list if necessary */
</style>
