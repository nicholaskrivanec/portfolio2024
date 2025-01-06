<template>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <RecordRow
          v-for="(row, index) in rows"
          :key="index"
          :fields="row"
        />
      </tbody>
    </table>
  </template>
  
  <script>

  export default {
    name: 'RecordTable',
    props: {
      headers: { type: Array, required: true },
      rows: { type: Array, required: true },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ddd;
  }
  </style>
  