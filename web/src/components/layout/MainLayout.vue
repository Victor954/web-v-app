<template>
    <main class="h-100">
        <div class="d-flex flex-column h-100">

            <Head />
            <slot></slot>
        </div>
    </main>
</template>
<script lang="ts" setup>
import Head from './header/Head.vue'
</script>