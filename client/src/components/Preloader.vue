<template>
    <div class="preload">
        <h1 v-if="showInlineDots">
            <div class="loading-dots">
                <span class="path-label">{{ label + " " }}</span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </h1>
        
      <svg v-if="showSpinner" class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path class="path1"
            d="M60.9 403.1a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z
            M208 464a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z
            M369.1 75A48 48 0 1 0 437 142.9 48 48 0 1 0 369.1 75z
            m0 294.2A48 48 0 1 0 437 437a48 48 0 1 0 -67.9-67.9z
            M416 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z" />
        <path class="path2"
            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z
            M96 256A48 48 0 1 0 0 256a48 48 0 1 0 96 0z
            M75 142.9A48 48 0 1 0 142.9 75 48 48 0 1 0 75 142.9z" />
      </svg>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
export default {
    name: "Preloader",
    props: {
        label: {type: String, default: 'Loading...'}
        ,loadType: {type: String, default: 'spinner'}
    },
    setup(props) {
        const showSpinner = ref(true);
        const showInlineDots = ref(false);
        const label = computed( () => {
            switch(props.label){
                case '/': return 'Home';
                case '/projects': return 'Projects';
                case '/sandbox': return 'Sandbox';
                case '/catwalk': return 'Catwalk';
                default: 'Loading'
            }
        });

        onMounted(() => {
            if (props.loadType === 'dots') {
                showSpinner.value = false;
                showInlineDots.value = true;
            } else {
                showSpinner.value = true;
                showInlineDots.value = false;
            }
        });
        return {
            label
            ,showSpinner
            ,showInlineDots
        };
    },
};
</script>



<style scoped>
    
</style>