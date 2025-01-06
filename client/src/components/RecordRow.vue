<template>
    <tr>
      <td v-for="(field, index) in fields" :key="index">
        {{ field }}
      </td>
    </tr>
  </template>
  
  <script>
  import { defineProps } from 'vue';
  
  export default {
    name: 'RecordRow',
    props: {
      fields: { type: Array, required: true },
    },
  };
  </script>
  
  <style scoped>
  tr {
    border-bottom: 1px solid #ccc;
  }
  </style>
  