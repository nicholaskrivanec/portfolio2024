<template>
    <div class="nav-btn">
        <router-link :to="path" class="nav-link">
            <div class="wrapper">
                <div>
                    <fa-icon :icon="['fas', icon]" />
                </div>
                <span>
                    <p class="nav-lbl row-1"><slot>Home</slot></p>
                </span>
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
    .nav-link{
        margin:0px;
        line-height:1px;
        text-align:center;
        vertical-align: bottom;
    }
    a.nav-link {
        color: var(--primary-text);
        display: block;
        line-height: 1px;
        padding: 4px;
    }
</style>