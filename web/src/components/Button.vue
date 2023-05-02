<template>
    <button :class="['btn', classType]">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">

import { computed } from 'vue';
type Props = {
    styleType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
}

const props = defineProps<Props>();

const classType = computed(() => `btn-${props.styleType}`);
</script>