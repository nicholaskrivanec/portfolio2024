// stores/loading.js
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    startLoading() {
      this.isLoading = true;
      document.body.classList.add('no-scroll');
    },
    async stopLoading() {
      setTimeout(() =>{
        document.body.classList.remove('no-scroll');
      }, 1000);
      this.isLoading = false;
    },
  },
});
