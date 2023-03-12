<template>
    <nav class="list-group">
        <RouterLink to="/" class="list-group-item">link1</RouterLink>
        <RouterLink to="/link2" class="list-group-item">link2</RouterLink>
        <RouterLink to="/link3" class="list-group-item">link3</RouterLink>
        <RouterLink to="/link4" class="list-group-item">link4</RouterLink>
        <RouterLink to="/link5" class="list-group-item">link5</RouterLink>
    </nav>
</template>
<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>
<style scoped lang="scss">
.list-group {
    padding: 1.5rem 0rem;
    height: 100%;
    border-radius: 0px;
    background-color: $blue-200;

    .list-group-item {
        background-color: $blue-200;
        color: $white;
        border: none;
        padding: 1rem 2rem;
    }
}
</style>