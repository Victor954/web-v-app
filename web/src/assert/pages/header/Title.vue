<template>
    <div class="d-flex align-items-center mb-3 gap-2">
        <MaterialIcon size="lg" :icon="$props.icon" type="outlined" />
        <h1 class="fs-5 mb-0">{{ $props.title }}</h1>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

import MaterialIcon from '@/assert/icons/MaterialIcon.vue';

type Props = {
    title: string,
    icon: string
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.material-icons-outlined {
    color: $blue-300;
}

h1 {
    background: -webkit-linear-gradient($blue-200, $blue-400);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>