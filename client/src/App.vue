<template>
  <div>
    <div :class="{ preloader,hidden: !loadingStore.isLoading }">
      <svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path class="path1"
            d="M60.9 403.1a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z
            M208 464a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z
            M369.1 75A48 48 0 1 0 437 142.9 48 48 0 1 0 369.1 75z
            m0 294.2A48 48 0 1 0 437 437a48 48 0 1 0 -67.9-67.9z
            M416 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z" />
        <path class="path2"
            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z
            M96 256A48 48 0 1 0 0 256a48 48 0 1 0 96 0z
            M75 142.9A48 48 0 1 0 142.9 75 48 48 0 1 0 75 142.9z" />
      </svg>
    </div>
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
