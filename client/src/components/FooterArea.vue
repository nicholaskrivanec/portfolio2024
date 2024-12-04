<template>
    <footer class="container">
      <p>Find me on social media.</p>
      <span class="foot_icon">
        <a href="https://www.linkedin.com/in/nkrivanec" title="www.linkedin.com/in/nkrivanec" target="_blank">
          <fa-icon :icon="['fab', 'linkedin']" class="fa-lg footer-link" title="LinkedIn" />
        </a>
      </span>
      <span class="foot_icon">
        <a href="https://github.com/nicholaskrivanec" title="www.github.com/nicholaskrivanec" target="_blank">
          <fa-icon :icon="['fab', 'github']" class="fa-lg footer-link" title="GitHub" />
        </a>
      </span>
      <span class="foot_icon">
        <a href="https://www.facebook.com/nickkrivanec" title="www.facebook.com/nickkrivanec" target="_blank">
          <fa-icon :icon="['fab', 'facebook']" class="fa-lg footer-link" title="Facebook" />
        </a>
      </span>
      <span class="foot_icon">
        <a href="https://www.instagram.com/nickkrivanec" title="www.instagram.com/nickkrivanec" target="_blank">
          <fa-icon :icon="['fab', 'instagram']" class="fa-lg footer-link" title="Instagram" />
        </a>
      </span>
    </footer>
</template>

<script>
    export default {
        name: 'FooterArea'
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