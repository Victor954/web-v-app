<template>
    <small :class="className">
        <slot></slot>
    </small>
</template>
<script setup lang="ts">
import { computed } from 'vue';
type Props = {
    type: 'error' | 'info'
}

const props = withDefaults(defineProps<Props>(), { type: 'info' });

const colorTextByType = computed(() =>
    props.type === 'error' ? 'text-danger' : 'text-muted'
);

const className = computed(() => [
    'form-text',
    colorTextByType.value
]);

</script>