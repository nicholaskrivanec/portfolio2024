<template>
    <div id="github-viewer">
        <h2>Enter any GitHub profile or URL</h2>
        <form @submit.prevent="fetchRepos">
            <input type="text" v-model="githubUrl" placeholder="Enter GitHub Profile URL or username" required value="nicholaskrivanec" />
            <button type="submit">Fetch Repos</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="container card scrollbar-y" v-if="repositories.length">
            <detail-box v-for="repo in repositories" :key="repo.id">
                <template v-slot:title1 >{{ repo.name }}</template>
                <template v-slot:title2 >{{ repo.language }}</template>
                <template v-slot><p>{{ repo.description || 'No description available' }} </p></template>
            </detail-box>
        </div>
        <p v-if="!repositories.length && error && submitted">{{ error }}</p>
    </div>
    <footer-area />
</template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useGitHubStore } from '@/stores/github';

export default {
name: "Projects"        
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
            return match ? match[1] : url;
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
                emit('view-loaded');
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
    font-family: Arial,sans-serif;
    text-align: center;
    margin: 20px;
    height: calc( 100vh - 165px );
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
form{
    display:inline-block;
}
.scrollbar-y {
    overflow-y: auto;
    max-height: calc(100% - 50px);
    padding: 8px;
}
h2 {
    display: inline-block;
    font-size: 25px;
    margin-right: 8px;
    vertical-align: middle;
}
</style>