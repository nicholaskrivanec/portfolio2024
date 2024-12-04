<template>
    <div class="slot-card">
        <slot></slot>
    </div>
</template>

<script>
</script>

<style scoped>
    div.slot-card {
        background-color: lightgreen;
        color: black;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        flex-basis: 150px;
        border-radius: 10px;
        border: solid black 2px;
        margin: 10px;
        padding: 20px 10px 0 10px;
        user-select:none;
    }
    div:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
</style>   