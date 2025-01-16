<template>
    <details class="container" @toggle="toggleCaret" :open="isExpanded">
        <summary :class="{ 'bottom-summary': lastRow }">
            <h5 :class="[cols[0]?.class || 'col-1']">
                <fa-icon :icon="[isOpen ? 'fas' : 'fas', isOpen ? 'caret-down' : 'caret-right']"
                    class="fa-fw margin-right" />
                {{ cols[0]?.value }}
            </h5>
            <span v-for="(col, index) in cols.slice(1)" :key="index" :class="col.class">
                <fa-icon v-show="col.icon" :icon="[col.icon]" />
                <span v-if="col.html" v-html="col.html"></span>
                <span v-else>{{ col.value }}</span>
            </span>
        </summary>
        <div class="detail-values">
            <div v-for="(detail, index) in details" :key="index" :class="[detail.class]">
                <div v-show="detail.icon"><fa-icon :icon="[detail.icon]" /></div>
                <div v-if="detail.html" v-html="detail.html"></div>
                <div v-else>{{ detail.value }}</div>
            </div>
        </div>
        <br />
    </details>
</template>

<script>
import { defineComponent, ref, nextTick } from "vue";

export default defineComponent({
    name: "DetailRow",
    props: {
        cols: {
            type: Array,
            required: false,
            default: () => [{ value: "", class: "col-1" }],
        },
        details: {
            type: Array,
            required: false,
            default: () => [{ value: "", class: "details" }],
        },
        isExpanded: { type: Boolean, default: false },
        lastRow: { type: Boolean, default: false },
        onToggle: { type: Function, default: null },
    },
    setup(props, { emit }) {
        const isOpen = ref(props.isExpanded);

        const toggleCaret = () => {
            isOpen.value = !isOpen.value;
            if (props.onToggle) {
                emit("toggle", isOpen.value);
                nextTick(() => props.onToggle(isOpen.value)); // Ensure nextTick triggers the parent's function
            }
        };

        return {
            isOpen,
            toggleCaret,
        };
    },
});
</script>

<style>
details{ border-radius: 6px; }
details[open] { background-color: var(--detail-row-open); }

.detail-rows .container {
    margin: 0;
    padding: 0;
    border: solid 1px transparent;
}

details[open]:hover {
    border-left: solid 1px var(--hover-text);
    border-top: solid 1px var(--tiffany-blue);
    border-right: solid 1px var(--hover-text);
    border-bottom: solid 1px var(--hover-text);
    background-color: var(--detail-row-hover);
    -webkit-user-select: none;
    user-select: none;
    transition: .3s;
}
details[open] summary:hover,
details[open] summary:hover .col-1  {
    background-color: transparent;
    color: var(--hover-text);
    opacity: 1 !important;
    user-select: none;
}

.details.col-1 { margin: 0; }
.detail-values { width: 100%; }
.col-1 { text-align: left; }
.col-2 { text-align: center; }
.col-3 { text-align: right; }

summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    border: solid 1px transparent;
    color: var(--grey-text);
}

summary:hover,
summary:hover i.fa-solid,
summary:hover .text-teal,
summary:hover .opacity, 
.about summary:hover,
.about summary:hover i.fa-solid,
.about summary:hover .text-teal,
.about summary:hover .opacity, 
.projects summary:hover,
.projects summary:hover i.fa-solid,
.projects summary:hover .text-teal,
.projects summary:hover .opacity 
{
    background-color: var(--detail-row-hover);
    color: var(--hover-text);
    opacity: 1 !important;
    -webkit-user-select: none;
    user-select: none;
    transition: .3s;
}

/*** ABOUT VIEW ***/
.about summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: solid 1px transparent;
    border-radius: 6px;
    color: var(--grey-text);
}

.about .col-2 {
    text-align: center;
    font-size: 16px;
    opacity: 0.8;
}

.about .details {
  padding: 0px 8px 0px 8px;
  opacity: 0.8;
}

.about.card, 
.about .card{
  box-shadow: none;
}
.about .header-row .col-1 { opacity: 0.8; }
.about .header-row .col-3 { opacity:0.8; } 
.about .col-1 { margin-left: 10px; }
.about .col-2 { margin:0 0 8px 0; }
.about .col-3 { margin-right: 16px; }

.about.col-1,
.about.col-2,
.about.col-3 {
    font-family: Roboto, sans-serif, Segoe UI, Arial;
    vertical-align: middle;
    font-weight: 700;
    height: 100%;
}
.about .details.col-2 div, 
.about .details.col-1 div {
    -webkit-user-select: text;
    user-select: text;
}
.header-row svg.svg-inline--fa.fa-fw {
    margin-right: 12px;
}

/** PROJECTS VIEW **/
.projects .details.col-2 div, 
.projects .details.col-1 div {
    -webkit-user-select: text;
    user-select: text;
    padding-left: 20px;
    width: 100%;
    text-align: left;
}

.projects a {
    color: inherit;
    background-color: transparent;
    text-decoration: none;
    cursor: pointer;
    transition: .3s;
}
.projects a:hover { color: var(--hover-text); }

.projects .code-icons{ margin-right: 15px; }

.projects summary {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: solid 1px transparent;
  color: var(--grey-text);
  min-width: 320px;
}
.projects span.js-icon.tooltip { background-size: 28px !important; }

.projects .details.col-1 div:before {
    content: "Source Code:";
    text-indent: 0px;
    margin-top: 0px;
    padding-right: 10px;
    opacity:0.8;
}
.projects .details.col-2 div:before {
    content: "Description:";
    text-indent: 0px;
    margin-top: 0px;
    padding-right: 10px;
    opacity:0.8;
}

.projects summary .col-1,
.projects summary .col-3,
.projects .header-row .col-1,
.projects .header-row .col-3 {
  font-family: Roboto,sans-serif,Segoe UI,Arial;
  width: 50%;
  margin: 0;
  padding:0;
}

.projects summary .col-1 { margin:10px;}
.projects summary .col-2 { margin:0 0 8px 0; }
.projects summary .col-3 { margin-right: 16px; }
.projects .details.col-2 { padding-right: 100px; }
</style>