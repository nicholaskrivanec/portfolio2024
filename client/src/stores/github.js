import { defineStore } from 'pinia';
import axios from 'axios';

export const useGitHubStore = defineStore('github', {
  state: () => ({
    repositories: [],
    error: null,
  }),
  actions: {
    async fetchRepositories(username) {
      this.error = null;
      this.repositories = [];

      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        this.repositories = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Error fetching repositories.';
      }
    },
  },
});
