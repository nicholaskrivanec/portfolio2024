<template>
    <nav class="card scrollbar-y">
        <div v-for="(cp, index) in colorpickers" :key="index">
            <color-picker :label="cp.label" :var="cp.var" :val="cp.val" />
        </div>
    </nav>
</template>

<script>
    import { ref, onMounted, watch} from 'vue';
    import { useUserStore } from '../stores/userStore'; 

    export default {
        name: "NavBar",
        setup() {
            const store = useUserStore();

            const colorpickers = ref([]);

            const removeInlineVars = () => {
                const target = store.isDarkMode ? document.body : document.documentElement;
                for (const property of target.style) {
                    if (property.startsWith('--')) {
                        target.style.removeProperty(property);
                    }
                }
            };

            const resetColors = () => {
                removeInlineVars(); 
                colorpickers.value = []; 
                colorpickers.value = fetchRootVariables(); 
            };

            const isValidHexColor = (clr) =>{
                const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
                return hexColorRegex.test(clr); // Test the input

            };

            const toCamelCase = (name) => {
                const cleanVariable = name.startsWith('--') ? name.slice(2) : name;
                return cleanVariable.split('-').map((word, index) => {
                    if (index === 0) 
                        return word; 
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join('');
            };  

            const fetchRootVariables = () => {
                const variablesArray = [];

                for (const sheet of document.styleSheets) {
                    try {
                        const rules = sheet.cssRules;
                        for (const rule of rules) {
                            if (rule.selectorText === ':root' && rule.style) {
                                const style = rule.style;
                                for (const property of style) {
                                    if (property.startsWith('--')) {
                                        const v = style.getPropertyValue(property).trim();
                                        if (isValidHexColor(v.toString())) {
                                            variablesArray.push({
                                                var: property,
                                                val: v.toString(),
                                                label: toCamelCase(property),
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.warn(`Cannot access stylesheet: ${sheet.href}`, e);
                    }
                }

                return variablesArray;
            };

            const setColorComponents = () => {
                colorpickers.value = fetchRootVariables();
            };

            onMounted( () => { 
                setColorComponents();
                watch(() => store.isDarkMode,
                    (newValue) => {
                        if (newValue !== undefined) resetColors();

                });
            });

            return {
                colorpickers,
                resetColors
            };
        },
    };
</script>

<style scoped>
    nav {
        width: 190px;
        position: fixed;
        left: 20px;
        top: 90px;
        bottom: 20px;
        font-size: 11px;
        overflow-y: auto;
        background-color: var(--nav-background);
        border-radius:8px;
    }
</style>
