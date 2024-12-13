<template>
    <nav class="card scrollbar-y">
        <div v-for="(cp,index) in colorpickers" :key="index">
            <color-picker :label="cp.label" :varName="cp.var" />
        </div>
    </nav>
</template>

<script>
    export default {
        name:"NavBar"
        ,data(){ return {
                colorpickers: [   
                     { var:"--primary-background", label: "Main"}
                    ,{ var:"--image-background",   label: "Image"}                        
                    ,{ var:"--menu-background",    label: "Menu"}
                    ,{ var:"--icon-header-text",   label: "Header"}                          
                    ,{ var:"--header-icon",        label: "Header Icon"}
                    ,{ var:"--container",          label: "Text Box"}
                ]
            };
        }
        ,methods: {
            resetColors() {
                const isDarkMode = document.body.classList.contains('dark-mode');
                const target = isDarkMode ? document.body : document.documentElement;
                const styles = target.style;

                for (let i = styles.length - 1; i >= 0; i--) {
                    const property = styles[i];
                    if (property.startsWith('--')) {
                        target.style.removeProperty(property);
                    }
                }
                this.colorpickers.forEach(cp => {
                    if (cp && typeof cp.resetColor === 'function') cp.resetColor();
                });
            }
        }
    }
</script>

<style>
nav {
    width: 88px;
    position: fixed;
    left: 10px;
    top: 90px;
    font-size: 9pt;
    background-color: var(--nav-background);
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    height: calc( 100% - 100px);
}
</style>