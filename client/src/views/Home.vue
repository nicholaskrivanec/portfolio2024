
<template>
  <about/>
  <projects/>
  <footer-area />
</template>

<script>
  import { onMounted } from "vue";
  export default {
    setup(_, { emit }) {
      onMounted(() => {
        emit('view-loaded');
      });
    }
  }
</script>
