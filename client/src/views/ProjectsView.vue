<template>
    <div id="github-viewer">
        <h2>GitHub Repository Viewer</h2>
        <form @submit.prevent="fetchRepos">
            <input type="text" v-model="githubUrl" placeholder="Enter GitHub Profile URL or username" required value="nicholaskrivanec" />
            <button type="submit">Fetch Repos</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="container card scrollbar-y scrollbar-x" v-if="repositories.length">
            <detail-box v-for="repo in repositories" :key="repo.id">
                <template v-slot:title1 ><a target="_blank" :href="repo.html_url" :title="repo.html_url">{{ repo.name }}</a></template>
                <template v-slot:title2 >{{ repo.language }}</template>
                <template v-slot><p>{{ repo.description || 'No description available' }} </p></template>
            </detail-box>
        </div>
        <p v-if="!repositories.length && !error && submitted">Error: {{ error }}</p>
    </div>
</template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useGitHubStore } from '@/stores/github';

export default {
name: "ProjectsView"        
    ,setup(_, { emit }) {
        const githubUrl = ref('https://github.com/nicholaskrivanec');
        const submitted = ref(false);
        const gitStore = useGitHubStore();
        const repositories = computed(() => gitStore.repositories);
        const profile = computed(() => gitStore.profile);
        const activity = computed(() => gitStore.activity); 
        const error = computed(() => gitStore.error);

        const fetchRepos = () => {
            const username = extractUsername(githubUrl.value);
            if (!username) {
                gitStore.error = 'Invalid GitHub URL.';
                return;
            }
            submitted.value = true;
            gitStore.fetchRepositories(username);
            gitStore.fetchUserProfile(username);
            gitStore.fetchUserActivity(username);
        };


        const fetchProfile = () => {
            const username = extractUsername(githubUrl.value);
            if (!username) {
                gitStore.error = 'Invalid GitHub URL.';
                return;
            }
            submitted.value = true;
            gitStore.fetchUserProfile(username);
        }
        const extractUsername = (url) => {
            const match = url.match(/github\.com\/([\w-]+)/);
            return match ? match[1] : null;
        };

        const fetchActivity = () => {
            const username = extractUsername(githubUrl.value);
            if (!username) {
                gitStore.error = 'Invalid GitHub URL.';
                return;
            }
            submitted.value = true;
            gitStore.fetchUserActivity(username);
        }   
        onMounted(()=> {
            
            nextTick(()=> {
                emit('view-loaded', {data:{includeIconsSwitch: false, includeColorSwitch: false}});
                fetchRepos();
                fetchProfile();
                fetchActivity();
            });
        });
        return {
            githubUrl,
            repositories,
            profile,
            activity,
            error,
            submitted,
            fetchRepos,
            fetchProfile,
            fetchActivity,
        };
    },
};
</script>

<style scoped>
#github-viewer {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
}

input[type=text] {
  width: 300px;;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  border-radius:10px;
}

input[type=text]:focus {
  border: 3px solid #555;
}

button {
    padding: 10px 20px;
    margin-left: 8px;
    border-radius: 10px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>