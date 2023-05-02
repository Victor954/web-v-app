<template>
    <article class="d-flex align-items-center gap-2">
        <Icon :icon="$props.icon" class="text-primary" />
        <h4>{{ $props.label }}</h4>
    </article>
</template>
<script setup lang="ts">
import Icon from '../Icon.vue';
import { MaterialIcon } from 'material-icons';

type Props = {
    label: string;
    icon: MaterialIcon
}

defineProps<Props>();

</script>