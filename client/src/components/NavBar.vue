<template>
    <slot>
        <nav class="card">
          <div v-for="cp in colorpickers" :key="cp.id">
            <color-picker :id="cp.id" :label="cp.label" :varName="cp.var" />
          </div>
        </nav>
    </slot>
</template>

<script>
    import { v4 as uuidv4 } from 'uuid';
    export default {
        name:"NavBar"
        ,data(){ return {
                colorpickers: [   
                    {id: uuidv4(), var:"--primary-background",  label: "Main"}
                    ,{id: uuidv4(), var:"--image-background",   label: "Image"}                        
                    ,{id: uuidv4(), var:"--menu-background",    label: "Menu"}
                    ,{id: uuidv4(), var:"--icon-header-text",   label: "Header"}                          
                    ,{id: uuidv4(), var:"--header-icon",        label: "Header Icon"}
                    ,{id: uuidv4(), var:"--container",          label: "Text Box"}
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
    
</style>