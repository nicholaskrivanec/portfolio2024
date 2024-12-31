<template>
    <footer class="container">
      <span v-for="link in links" :key="link">
        <span class="foot_icon" >
          <a class="tooltip" :href="link.url" :data-tooltip="link.title" target="_blank">
            <fa-icon :icon="['fab', link.icon]" class="fa-lg footer-link" :data-tooltip="link.name" />
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
        margin-top: 16px;
        width: 100%;
    }

    footer.container {
        text-align: center;
        background-color: var(--primary-background);
        color: var(--primary-background-text);
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