<template>
    <span :class="classObject">{{ $props.icon }}</span>
</template>

<script lang="ts" setup>

import { defineProps, withDefaults, computed } from 'vue'

type Props = {
    icon: string,
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    type?: 'default' | 'outlined' | 'round' | 'sharp' | 'two-tone';
}

const props = withDefaults(defineProps<Props>(), {
    type: 'default'
})

const iconClass = computed(() => {
    const prefix = props.type === 'default' ? '' : `-${props.type}`;
    return `material-icons${prefix}`;
})

const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'fs-6';
        case 'md':
            return 'fs-5';
        case 'lg':
            return 'fs-4';
        case 'xl':
            return 'fs-3';
        case '2xl':
            return 'fs-2';
        default:
            return 'fs-6';
    }
})

const classObject = computed(() => ({
    [iconClass.value]: true,
    [sizeClass.value]: true
}))

</script>