<template>
    <i :data-feather="$props.icon"></i>
</template>
<script setup lang="ts">
import feather, { FeatherIconNames } from 'feather-icons';
import { onMounted, useAttrs } from 'vue';

type Props = {
    icon: FeatherIconNames
}

defineProps<Props>();

const attrs = useAttrs() as Partial<feather.FeatherAttributes>;

onMounted(() => {
    feather.replace(attrs);
})

</script>