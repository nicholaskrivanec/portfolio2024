import { defineStore } from 'pinia';
import axios from 'axios';

export const useGitHubStore = defineStore('github', {
  state: () => ({
    repositories: [],
    activity: [],
    pofile: null,
    error: null,
    requestrepos: null,
    requestuser: null,
  }),
  actions: {
    async fetchRepositories(username) {
      if(username === this.requestrepos && this.repositories.length > 0) return;
      this.requestrepos = username;
      this.error = null;
      this.repositories = [];


      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        if (response.data){
          this.repositories = response.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            language: repo.language,
            icon: 
              (repo.language === 'Java') ? 'java-icon' :
              (repo.language === 'JavaScript') ? 'js-icon' :
              (repo.language === 'Python') ? 'python-icon' :
              (repo.language === 'HTML') ? 'html-icon' :
              (repo.language === 'CSS') ? 'css-icon' :
              (repo.language === 'Vue') ? 'vue-icon' :
              (repo.language === 'C++') ? 'cpp-icon' :
              (repo.language === 'C#') ? 'csharp-icon' :
              (repo.language === 'C') ? 'c-icon' :
              (repo.language === 'R') ? 'r-icon' :
              (repo.language === 'PowerShell') ? 'ps-icon' :
              (repo.language === 'SQL') ? 'sql-icon' : repo.language,
            description: repo.description,
            url: repo.url,
            html_url: repo.html_url,
          }));
        } 
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Error fetching repositories.';
      }
    },

    async fetchUserProfile(username) {
      if (username === this.requestuser && this.profile) return;
      this.requestuser = username;
      this.error = null;
      this.profile = null;

      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        if (response.data) {
          this.profile = {
            avatar: response.data.avatar_url, 
            name: response.data.name,
            bio: response.data.bio,
            location: response.data.location,
            public_repos: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following,
          };
        }
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
