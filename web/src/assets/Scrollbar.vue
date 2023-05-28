<template>
    <div ref="rootElementRef">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SimpleBar from 'simplebar';

const rootElementRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
    if (rootElementRef.value) {
        new SimpleBar(rootElementRef.value);
    }
});
</script>