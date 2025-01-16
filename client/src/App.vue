<template>
  <div>
    <transition name="slide-left">
      <div class="preloader" v-show="isLoading">
        <preloader :label="path" loadType="dots" />
      </div>
    </transition>

    <div class="scrollbar-y body-scroll-area" v-show="!isLoading">
      <menu-bar :includeIconSwitch="includeIconSwitch" :includeColorSwitch="includeColorSwitch"
        @toggle-icons="toggleIcons" @toggle-colors="toggleColors" :showTitleArea="showTitleArea" :id="menu" />

      <router-view @view-loaded="handleViewLoaded" v-slot="{ Component, route }">
        <keep-alive :include="cachedComponents">
          <component :is="Component" :key="route.fullPath" :id="main" />
        </keep-alive>
      </router-view>
      
      <footer-area />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue';
import { useLoadingStore } from './stores/loading';
import { useRoute } from 'vue-router';
import router from './router';

export default {
  setup() {
    const loadingStore = useLoadingStore();
    const includeIconSwitch = ref(true);
    const includeColorSwitch = ref(false);
    const showTitleArea = ref(true);
    const isLoading = computed(() => loadingStore.isLoading);
    const route = useRoute();
    const path = computed(() => route.path);
    const from = ref('/');
    const to = ref('/');

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

    watch(() => route.path, async (newPath, oldPath) => {
      from.value = oldPath || '/';
      to.value = newPath;

      loadingStore.startLoading();
      isLoading.value = true;
      switch (route.path) {
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
          includeColorSwitch.value = false;
          break;
        case '/three':
          showTitleArea.value = false;
          includeIconSwitch.value = false;
          includeColorSwitch.value = false;
          break;
        default:
          showTitleArea.value = false;
          includeIconSwitch.value = true;
          includeColorSwitch.value = false;
          break;  
      }
    });

    const isMobileDevice = computed(() => {
      const userAgentCheck = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const widthCheck = window.innerWidth <= 768;

      return userAgentCheck || touchCheck || widthCheck;
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
      showTitleArea,
      path,
      isMobileDevice
    };
  },
};
</script>

<style>
body.no-scroll {
  overflow: hidden !important;
}

.hidden {
  display: none;
  visibility: hidden;
  opacity: 0;
}

.slide-left-enter-active {
  animation: slide-in-left 0.5s forwards;
}
.slide-left-leave-active {
  animation: slide-out-left 0.5s forwards;
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.slide-right-enter-active {
  animation: slide-in-right 0.5s forwards;
}
.slide-right-leave-active {
  animation: slide-out-right 0.5s forwards;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(100%);
  }
}

.slide-enter-active {
  animation: slide-in 0.5s forwards, gradient-in 0.5s forwards;
}
.slide-leave-active {
  animation: slide-out 0.5s forwards, gradient-out 0.5s forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes gradient-in {
  from {
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  }
  to {
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  }
}

@keyframes gradient-out {
  from {
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  }
  to {
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  }
}

.preload {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--preload-background);
    z-index: 9999;
    overflow: hidden;
}

.spin {
  height: 50px;
  width: 50px;
  animation-name: spin;
  animation-direction: normal;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(8);
}

.spin path {
  fill: var(--preload-svg);
}

.spin path.path1 {
  opacity: 0.4;
}

.spin path.path2 {
  opacity: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(1turn);
  }
}

.loading-dots {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 4px
}

.path-label{
  padding-right:14px;
}
.dot {
  display:inline-block;
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: var(--preload-svg);
  border-radius: 50%;
  animation: bounce 1.5s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0s;
}

.dot:nth-child(3) {
  animation-delay: 0.3s;
}

.dot:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

.body-scroll-area {
  transform-origin: top left;
}

</style>