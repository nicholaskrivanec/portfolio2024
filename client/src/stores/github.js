import { defineStore } from 'pinia';
import axios from 'axios';

export const useGitHubStore = defineStore('github', {
  state: () => ({
    repositories: [],
    activity: [],
    pofile: null,
    error: null,
  }),
  actions: {
    async fetchRepositories(username) {
      this.error = null;
      this.repositories = [];

      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        if (response.data) this.repositories = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Error fetching repositories.';
      }
    },
    async fetchUserProfile(username) {
      this.error = null;
      this.profile = null;

      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        if (response.data) this.profile = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Error fetching profile.';
      }
    },
    async fetchUserActivity(username) {
      this.error = null;
      this.activity = [];

      try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`);
        if (response.data) this.activity = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Error fetching activity.';
      }
    }
  },
});
