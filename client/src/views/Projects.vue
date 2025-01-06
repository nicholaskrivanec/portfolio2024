<template>
    <div class="github-viewer">
      <!-- Profile Section -->
      <div class="input-form">
        <form @submit.prevent="fetchRepos">
          <input
            type="text"
            v-model="githubUrl"
            placeholder="Enter GitHub Profile URL or username"
            required
          />
          <button type="submit">
            <fa-icon :icon="['fab', 'github']" class="fa-lg git-link" />Projects
          </button>
        </form>
      </div>
      <div v-if="profile" class="profile-section">
        <img :src="profile.avatar" alt="User Avatar" class="user-avatar" />
        <h3>{{ profile.name }}</h3>
        <p>{{ profile.bio }}</p>
        <p><strong>Location:</strong> {{ profile.location }}</p>
        <p>
          <strong>Public Repos:</strong> {{ profile.public_repos }} |
          <strong>Followers:</strong> {{ profile.followers }} |
          <strong>Following:</strong> {{ profile.following }}
        </p>
      </div>
  
      
  
      <div v-if="error" class="error">{{ error }}</div>
  
      <div class="container card" v-if="repositories.rows && repositories.rows.length">
        <detail-rows :data="repositories" />
      </div>
      <p v-else-if="submitted && !repositories.rows.length">No repositories found.</p>
    </div>
  </template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import { useGitHubStore } from "@/stores/github.js";
import { useUserStore } from "@/stores/userStore.js";

export default {
  name: "Projects",
  setup(_, { emit }) {
    const githubUrl = ref("https://github.com/nicholaskrivanec");
    const submitted = ref(false);
    const gitStore = useGitHubStore();
    const userStore = useUserStore();

    const showIcons = computed(() => userStore.iconMode);

    const repositories = computed(() => {
      return {
        headers: [
          { value: "Repository", class: "col-1", icon: null, html: null },
          { value: "URL", class: "col-2", icon: null, html: null },
          { value: "Language", class: "col-3", icon: null, html: null },
        ],
        rows: gitStore.repositories.map((repo) => ({
          cols: [
            { value: repo.name, class: "projects col-1", icon: null, html: null },
            {
              value: null,
              class: "projects col-2",
              icon: null,
              html: `<a href="${repo.html_url}" class="tooltip" target="_blank">
                       View on GitHub
                     </a>`,
            },
            {
              value: repo.language || "Unknown",
              class: "projects col-3",
              icon: null,
              html: showIcons.value
                ? `<div class="code-icons col-3">
                     <span class="${repo.icon || ""} tooltip" data-tooltip="${repo.language}"></span>
                   </div>`
                : null,
            }
           
          ],
          details: [
            {
              value: repo.description || "No description provided.",
              class: "details col-1",
              icon: null,
              html: null,
            },
          ],
          isExpanded: false,
        })),
      };
    });

    const profile = computed(() => gitStore.profile);
    const error = computed(() => gitStore.error);

    const fetchRepos = () => {
      const username = extractUsername(githubUrl.value);
      if (!username) {
        gitStore.error = "Invalid GitHub URL.";
        return;
      }
      submitted.value = true;
      gitStore.fetchRepositories(username);
      gitStore.fetchUserProfile(username);
    };

    const extractUsername = (url) => {
      const match = url.match(/github\.com\/([\w-]+)/);
      return match ? match[1] : url;
    };

    onMounted(() => {
      emit("view-loaded");
      nextTick(() => {
        fetchRepos();
      });
    });

    return {
      githubUrl,
      repositories,
      profile,
      error,
      submitted,
      fetchRepos,
    };
  },
};
</script>

<style scoped>

.github-viewer {
    text-align: center;
    min-height: calc(100vh - 165px);
    margin: 20px auto;
    max-width: 1168px;
}

.profile-section {
    margin: 20px 0;
    text-align: center;
}

.user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
}

a.tooltip {
    color: var(--container-text);
    text-decoration: none;
}

a.tooltip:hover {
    color: var(--hover-text);
}


.github-viewer {
    text-align: center;
    min-height: calc(100vh - 165px);
    margin: 20px auto;
    max-width: 1168px;
}

a.tooltip {
    color: var(--container-text);
    text-decoration: none;
}

a.tooltip:hover {
    color: var(--hover-text);
}

.input-form {
    min-height: 50px;
    background-color: var(--primary-background);
    color: var(--container-text);
}

input[type=text] {
    display: inline-block;
    width: 300px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    outline: none;
    padding: 8px 10px;
    margin: 16px 8px;
    border-radius: 4px;
    text-align: center;
    transition: all .3s ease;
    background-color: var(--download-btn);
    border: 2px solid var(--download-btn-text);
    color: var(--download-btn-text);
    font-size: 16px;
}

input[type=text]:focus {
    border: 2px solid #555;
}

button {
    display: inline-block;
    padding: 7px 10px;
    margin: 16px 8px;
    text-decoration: none;
    border-radius: 4px;
    text-align: center;
    transition: all .3s ease;
    background-color: var(--download-btn);
    border: 2px solid var(--download-btn-text);
    color: var(--download-btn-text);
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: var(--download-btn-hover);
    color: var(--download-btn-text-hover);
}

.error {
    color: red;
    margin-top: 10px;
}

form {
    display: inline-block;
}

h2 {
    display: inline-block;
    font-size: 25px;
    margin-right: 8px;
    vertical-align: middle;
}

.git-link {
    padding-right: 6px;
}
</style>