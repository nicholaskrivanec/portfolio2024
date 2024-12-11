<template>
    <div class="nav-btn">
        <router-link :to="path" class="nav-link">
            <div class="wrapper">
                <div><fa-icon :icon="['fas', icon]" /></div>
                <span class="nav-lbl row-1"><slot>Home</slot></span>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'NavButton'
    ,data(){

    }
    ,props: {
        path: { type: String, required: true },
        icon: { type: String, required: false }
    }
}
</script>

<style>

    .nav-btn{
        display:inline-block;
        font-size: 30px;
        border: solid 2px transparent; 
        border-radius: 10px;
    }

    .nav-btn a{
        border: solid 2px transparent;
        border-radius: 10px;
        user-select: none;
        -webkit-user-select: none;
        -webkit-user-drag: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
    .nav-btn:hover a {
        color: var(--hover-text);
        transition: .3s;
        background-color: transparent;
        border-color: var(--hover-text);
    }
    .nav-lbl{
        font-size:9pt;
        display:block;
    }

    a.nav-link {
        color: var(--primary-text);
        font-size: 14pt;
        display: block;
        line-height: 20px;
        padding: 4px;
        transition:0.3s;
        margin:0px;
        text-align:center;
        color: var(--primary-text);
        display: block;
        padding: 0px 4px;
}

</style>