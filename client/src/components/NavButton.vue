<script>
    export default {
        name: 'NavButton'
        ,props: {
            path: { type: String, required: true },
            icon: { type: String, required: false },
            label: { type: String, required: false },
            isActive: {type: Boolean, required: false, default: false}
        }
    }
</script>

<template>
    <li class="nav-btn">
        <router-link :to="path" :class="{'nav-link':true, 'tooltip':true}" :data-tooltip="label">
            <div class="wrapper" :class="navLink">  
                <span><fa-icon :icon="['fas', icon]" /></span>
                <span class="nav-lbl row-1"><slot>{{ label }}</slot></span>
            </div>
        </router-link>
    </li>
</template>


<style>
.wrapper {
    display: inline-block;
    padding: 0px 10px 0px 10px;
    white-space: nowrap;
    text-overflow: clip;
}

.nav-btn a{
  position:relative;
  margin-bottom: 0px;
  border-left: solid 1px transparent;
  border-right: solid 1px transparent;
  border-top: solid 1px transparent;
  border-bottom:solid 1px transparent;
  -webkit-border-top-left-radius: 12px;
  -webkit-border-top-right-radius: 12px;
  -moz-border-radius-topleft: 12px;
  -moz-border-radius-topright: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px; 
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;
  display:inline-block;
  vertical-align: bottom;
  color: var(--menu-text);
  
}

.nav-btn:hover a {
  color: var(--hover-text);
  background-color: transparent;
  border-left-color: var(--hover-text);
  border-right-color: var(--hover-text);
  border-top-color: var(--hover-text);
}

.nav-btn a.router-link-active {
    position: relative;
    color: var(--primary-background-text);
    background-color: var(--primary-background);
    border-color: var(--menu-border);
    border-bottom: solid 1px var(--primary-background);
    z-index: 3;
    border-top: solid 1px var(--menu-border);
    border-left: solid 1px var(--menu-border);
    border-right: solid 1px var(--menu-border);
}

a .nav-link {
  background-color: var(--primary-background);
  color: var(--primary-text);
  font-size: 15px;
  line-height: 20px;
  margin: 0;
  text-align: center;
  display: block;
  padding: 0 4px;
  margin-right: 0px;
}

.nav-lbl {
    font-size: 15px;
    padding-left: 4px;
}


</style>