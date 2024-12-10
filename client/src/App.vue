<template>
  <div>
    <preloader :class="{ hidden: !loadingStore.isLoading }" />
    <menu-bar :includeIconSwitch="includeIconSwitch" :includeColorSwitch="includeColorSwitch" />
    <router-view 
      :class="{ hidden: loadingStore.isLoading }" 
      @view-loaded="handleViewLoaded"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLoadingStore } from './stores/loading';

const loadingStore = useLoadingStore(); // Access loading state
const includeIconSwitch = ref(false);
const includeColorSwitch = ref(false);

const route = useRoute();

// Watch route changes to update switches
watch(() => route.path, (newPath) => {
  includeIconSwitch.value = newPath === '/'; // Icons on home
});

function handleViewLoaded(payload) {
  if (payload?.data) {
    if (payload.data.includeIconSwitch) includeIconSwitch.value = true;
    if (payload.data.includeColorSwitch) includeColorSwitch.value = true;
  }
  setTimeout(() => loadingStore.stopLoading(), 500);
}
</script>

<style scoped>
.hidden {
  visibility: hidden; /* Or use display: none; to remove it entirely */
}
</style>
