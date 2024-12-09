<template>
    <footer class="container">
      <p>Find me on social media.</p>
      <span v-for="link in links" :key="link">
        <span class="foot_icon" >
          <a :href="link.url" :title="link.title" target="_blank">
            <fa-icon :icon="['fab', link.icon]" class="fa-lg footer-link" :title="link.name" />
          </a>
        </span>
      </span>
    </footer>
</template>

<script>
  import { useUserStore} from '../stores/userStore';
  export default {
      name: 'FooterArea'
      ,setup() {
          const ds = useUserStore();
          return {
            links:ds.links,
            data: ds.data
          }
      }
  }
</script>

<style scoped>
    .footer-link{
        font-size: 30px;
    }

    .footer-link:hover{
        font-size: 36px;
        color: var(--hover-text);
    }

    footer{
        position:relative;
        margin-top: 16px;
    }

    footer.container {
        text-align: center;
        background-color: var(--menu-background);
        color: var(--menu-text);
        padding-bottom: 20px;
        height:100px;
        margin-bottom: 0px;
    }

    footer .foot_icon {
        display: inline-block;
        height: 40px;
        width: 45px;
        text-align: center;
        vertical-align: bottom;
    }

    svg {
        padding: 0px;
        border: 0px;
    }
</style>