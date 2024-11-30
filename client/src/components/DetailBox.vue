<template>
    <details class="container" @toggle="toggleCaret">
        <summary :class="{ 'bottom-summary': lastRow }">
            <h5 class="col-1 opacity">
                <i class="fa-solid fa-caret-down" v-show="isOpen"></i>
                <i class="fa-solid fa-caret-right" v-show="!isOpen"></i>
                <b> {{ title1 }}</b>
                <img v-if="logoSrc" :src="logoSrc" class="dblogo" alt="logo" />
            </h5>
            <h6 class="col-2 text-teal">
                <i class="fa-solid fa-calendar fa-fw margin-right label-icon"></i>{{ date }}
            </h6>
        </summary>
        <h5 class="col-3 opacity"><b>{{ title2 }}</b></h5>
        <p>{{ details }}</p>
        <hr v-if="!lastRow">
        <br v-if="lastRow">
    </details>
</template>

<script>


export default {
    name: 'DetailBox',
    props: {
        title1: { type: String, required: true },
        title2: { type: String, required: false },
        date: { type: String, required: false },
        details: { type: String, required: false },
        lastRow: { type: Boolean, required: false, default: false },
        onOpen: { type: Function, default: null },
        onClose: { type: Function, default: null },
        onToggle: { type: Function, default: null },
        logoSrc: { type: String, default: null }
    }
    , data: () => ({ isOpen: false })
    , methods: {
        toggleCaret() {
            this.isOpen = !this.isOpen;

            if (this.onToggle)
                this.onToggle();
            if (this.isOpen && this.onOpen)
                this.onOpen();
            if (!this.isOpen && this.onClose)
                this.onClose();
        }
    }
}
</script>

<style scoped>

summary {
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    padding: 0px 8px 0px 8px;
    margin-left: -10px;
    border: solid 2px transparent;
    border-radius: 10px;
    color: var(--grey-text);
}

summary:hover,
summary:hover .text-teal,
summary:hover .opacity {
    background-color: var(--hover-background);
    color: var(--hover-text);
    opacity: 1 !important;
}

summary h5 {
    cursor: pointer;
    text-align: left;
}

details h5.col-3 {
    text-align: center;
    font-size: 13pt;
    margin: 0;
}
summary h6.col-1 {
    padding-right: 8px;
}

summary::marker,
summary h6 {
    display: inline-block;
    cursor: pointer;
}

details[open]>summary.bottom-summary:after {
    margin-bottom: 0;
}

details:not([open])>summary.bottom-summary {
    margin-bottom: 16px;
}
</style>