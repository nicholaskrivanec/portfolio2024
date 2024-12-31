<template>
  <div>
    <div v-show="isLoading" class="preloader">
      <preloader />
    </div>
    <div class="scrollbar-y body-scroll-area" v-show="!isLoading">
      <menu-bar 
        :includeIconSwitch="includeIconSwitch" 
        :includeColorSwitch="includeColorSwitch"
        @toggle-icons="toggleIcons" 
        @toggle-colors="toggleColors" 
        :showTitleArea = "showTitleArea" 
        :id="menu"
      />

      <router-view @view-loaded="handleViewLoaded" v-slot="{ Component, route }">
        <keep-alive :include="cachedComponents">
          <component 
            :is="Component" 
            :key="route.fullPath" 
            :id="main"
          />
        </keep-alive>
      </router-view>
      
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLoadingStore } from './stores/loading';
import router from './router';

export default {
  setup() {
    const loadingStore = useLoadingStore();
    const includeIconSwitch = ref(false);
    const includeColorSwitch = ref(false);
    const showTitleArea = ref(true);
    const isLoading = computed(() => loadingStore.isLoading);
    const route = useRoute();

    const cachedComponents = computed(() =>
      router.getRoutes()
        .filter(route => route.meta.keepAlive)
        .map(route => route.name)
    );

    const handleViewLoaded = () => {
      setTimeout(() => {
        loadingStore.stopLoading();
        isLoading.value = false;
      }, 700);
    };


    watch(() => route.path, () => {

      loadingStore.startLoading();
      isLoading.value = true;
      switch (route.path){
        case '/':
          showTitleArea.value = true;
          includeIconSwitch.value = true;
          includeColorSwitch.value = false;
          break;
        case '/projects':
          showTitleArea.value = false;
          includeIconSwitch.value = true;
          includeColorSwitch.value = false;
          break;
        case '/sandbox':
          showTitleArea.value = false;
          includeIconSwitch.value = false;
          includeColorSwitch.value = true;
          break;
        default:
          showTitleArea.value = false;
          includeIconSwitch.value = false;
          includeColorSwitch.value = false;
          break;
        
      }
    });

    onMounted(() => {
      loadingStore.startLoading();
      isLoading.value = true;
    });

    return {
      includeIconSwitch,
      includeColorSwitch,
      isLoading,
      cachedComponents,
      handleViewLoaded,
      showTitleArea
    };
  },
};
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Adjust for visibility */
  z-index: 9999;
}

.hidden {
  display: none;
  visibility: hidden;
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}

.spin {
  height: 50px;
  width: 50px;
  animation: spin 1s steps(8) infinite;
}

.spin path {
  fill: var(--preload-svg);
}
</style>
