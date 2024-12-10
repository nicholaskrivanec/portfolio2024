<template>
    <div id="github-viewer">
        <h1>GitHub Repository Viewer</h1>
        <form @submit.prevent="fetchRepos">
            <input type="text" v-model="githubUrl" placeholder="Enter GitHub Profile URL" required />
            <button type="submit">Fetch Repos</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-if="repositories.length">
            <li v-for="repo in repositories" :key="repo.id">
                <h2>{{ repo.name }}</h2>
                <p>{{ repo.description || 'No description available' }}</p>
            </li>
        </ul>
        <p v-if="!repositories.length && !error && submitted">No repositories found.</p>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { useGitHubStore } from '@/stores/github';

export default {
    name: "ProjectsView"
    ,setup(_, { emit }) {
        const githubUrl = ref('');
        const submitted = ref(false);
        const store = useGitHubStore();
        const { repositories, error } = store;

        const fetchRepos = () => {
            const username = extractUsername(githubUrl.value);
            if (!username) {
                store.error = 'Invalid GitHub URL.';
                return;
            }
            submitted.value = true;
            store.fetchRepositories(username);
        };

        const extractUsername = (url) => {
            const match = url.match(/github\.com\/([\w-]+)/);
            return match ? match[1] : null;
        };
        onMounted(()=> {
            nextTick(()=> {
                emit('view-loaded')
            });
        });
        return {
            githubUrl,
            repositories,
            error,
            submitted,
            fetchRepos,
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

form {
    margin-bottom: 20px;
}

input {
    padding: 10px;
    width: 300px;
}

button {
    padding: 10px 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 20px 0;
    text-align: left;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>