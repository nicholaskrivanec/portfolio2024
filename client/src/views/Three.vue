<template>
    <div>
      <select v-model="currentExample" @change="loadExample">
        <option v-for="(name, key) in exampleOptions" :key="key" :value="key">{{ name }}</option>
      </select>
      <three-renderer :example="currentExample" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, emit } from 'vue';
  import { exampleList } from '../utils/exampleMapping.js';
  
  export default {
    name: "three"
    , setup(_, { emit }) {
      const currentExample = ref(Object.keys(exampleList)[0]); // Default to the first example
      
      const exampleOptions = Object.keys(exampleList).reduce((acc, key) => {
        acc[key] = exampleList[key].name;
        return acc;
      }, {});
  
      const loadExample = () => {
        // React to example changes (if needed)
      };

      onMounted(() => {
        emit('view-loaded');
      });
      
      return {
        currentExample,
        exampleOptions,
        loadExample,
      };
    },
  };
  </script>
  
  <style>

  select {
    display:inline-block;
    position:absolute;
    top: 80px;
    left:20px;
    z-index:99999;
    height:25px;
    width:200px;
  }
  </style>
  