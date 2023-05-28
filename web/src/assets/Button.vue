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
    inline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    outline: false,
});

const classType = computed(() => `btn${getPrefix()}-${props.styleType}`);

function getPrefix() {

    if (props.outline) return '-outline';

    if (props.inline) return '-inline';

    return '';
}
</script>
<style lang="scss" scoped>
@import '@/scss/buttons.scss';
</style>