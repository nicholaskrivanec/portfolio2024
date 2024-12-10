<template>
    <div class="preloader">
      <svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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

</script>



<style scoped>
    .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .spin {
    height:50px;
    width: 50px;
    animation-name: spin;
    animation-direction: normal;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: steps(8);
    }

    .spin path {
    fill: var(--preload-svg);
    }
    .spin path.path1{
    opacity: 0.4;
    }
    .spin path.path2{
    opacity: 1;
    }
    @keyframes spin{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(1turn);
    }
    }
</style>