<template>
    <article :class="className">
        <Icon v-if="icon" :icon="($props.icon as MaterialIcon)" class="text-primary" />
        <h4>{{ $props.label }}</h4>
    </article>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon.vue';
import { MaterialIcon } from 'material-icons';

type Props = {
    label: string;
    icon?: MaterialIcon
}

const props = withDefaults(defineProps<Props>(), {});

const className = computed(() => ({
    'd-flex align-items-center': true,
    'gap-2': props.icon
}));

</script>