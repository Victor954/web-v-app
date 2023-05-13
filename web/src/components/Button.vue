<template>
    <button :class="['btn', classType]">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">

import { computed } from 'vue';
type Props = {
    styleType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    outline: false,
});

const classType = computed(() => `btn${getOutline()}-${props.styleType}`);

function getOutline() {
    return props.outline ? '-outline' : '';
}
</script>