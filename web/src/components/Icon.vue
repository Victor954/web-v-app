<template>
    <i :class="iconTypeClass">{{ $props.icon }}</i>
</template>
<script setup lang="ts">
import { MaterialIcon } from 'material-icons';
import { computed } from 'vue';

type Props = {
    icon: MaterialIcon,
    styleType?: 'filled' | 'outlined' | 'round' | 'sharp' | 'twoTone'
}

const stylePostfix = {
    'filled': '',
    'twoTone': '-two-tone',
    'outlined': '-outlined',
    'round': '-round',
    'sharp': '-sharp'
}

const props = withDefaults(defineProps<Props>(), {
    styleType: "filled"
});

const iconTypeClass = computed(() => `material-icons${stylePostfix[props.styleType]}`);

</script>