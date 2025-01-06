<template>
    <details class="container" @toggle="toggleCaret" :open="isExpanded">
        <summary :class="{ 'bottom-summary': lastRow }">
            <h5 :class="[cols[0]?.class || 'col-1']">
                <fa-icon :icon="[isOpen ? 'fas' : 'fas', isOpen ? 'caret-down' : 'caret-right']"
                    class="fa-fw margin-right" />
                {{ cols[0]?.value }}
            </h5>
            <span v-for="(col, index) in cols.slice(1)" :key="index" :class="col.class">
                <fa-icon v-if="col.icon" :icon="[col.icon]" />
                <span v-if="col.html" v-html="col.html"></span>
                <span v-else>{{ col.value }}</span>
            </span>
        </summary>
        <div v-for="(detail, index) in details" :key="index" :class="[detail.class]">
            <fa-icon v-if="detail.icon" :icon="[detail.icon]" />
            <span v-if="detail.html" v-html="detail.html"></span>
            <span v-else>{{ detail.value }}</span>
        </div>
        <hr v-if="!lastRow" />
        <br v-if="lastRow" />
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

summary {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 8px;
    margin-left: -10px;
    border: solid 2px transparent;
    border-radius: 10px;
    color: var(--grey-text);
    --icon-height: 33px;
}

summary:hover,
summary:hover i.fa-solid,
summary:hover .text-teal,
summary:hover .opacity {
    background-color: var(--hover-background);
    color: var(--hover-text);
    opacity: 1 !important;
    -webkit-user-select: none;
    user-select: none;
    transition: .3s;
}

.details.col-1 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: calc(100% - 46px);
}

.details.col-1:before {
    content: "Description: ";
    opacity: 0.6;
    margin: 0 46px;
}
.col-2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11pt;
    font-weight: normal;
    opacity: 0.8;

}

details h5.col-3 {
    font-family: Roboto, sans-serif, Segoe UI, Arial;
    text-align: center;
    font-size: 13pt;
    margin: 0;
    font-weight: bold;
}
.projects.col-1, .projects.col-2, .projects.col-3 {
    font-family: Roboto,sans-serif,Segoe UI,Arial;
    display: inline-block;
    width: 33%;
    vertical-align: middle;
    font-weight: 700;
    height: 100%;
}
.about.col-1, .about.col-2, .about.col-3 {
    font-family: Roboto,sans-serif,Segoe UI,Arial;
    vertical-align: middle;
    font-weight: 700;
    height: 100%;
}

.about.col-2 {
    margin-bottom:8px;
}
.col-1 {
    text-align: left;
}
.col-2 {
    text-align: center;
}
.col-3{
    text-align: right;
}
span.js-icon.tooltip {
    background-size: 33px !important;
}
.col-2 span {
    text-align: center;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}
</style>