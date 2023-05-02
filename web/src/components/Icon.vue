<template>
    <i class="material-icons-outlined">{{ $props.icon }}</i>
</template>
<script setup lang="ts">
import { MaterialIcon } from 'material-icons';

type Props = {
    icon: MaterialIcon
}

defineProps<Props>();


</script>