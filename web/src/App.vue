<template>
    <main>
        <nav>
            <RouterLink to="/">link1</RouterLink>
        </nav>
        <section>
            <RouterView />
        </section>
    </main>
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
</script>