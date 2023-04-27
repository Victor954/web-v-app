<template>
    <article class="d-flex align-items-center gap-2">
        <Icon :icon="$props.icon" class="text-primary" />
        <h4>{{ $props.label }}</h4>
    </article>
</template>
<script setup lang="ts">
import { FeatherIconNames } from 'feather-icons';

import Icon from '../Icon.vue';

type Props = {
    label: string;
    icon: FeatherIconNames
}

defineProps<Props>();

</script>