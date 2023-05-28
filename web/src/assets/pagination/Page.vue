<template>
    <li class="page-item" @click="clickHandler">
        <button :class="['page-link', className]" v-bind="attrs">
            <slot></slot>
        </button>
    </li>
</template>
<script setup lang="ts">
import { computed, useAttrs } from 'vue';

type Props = {
    type: 'page' | 'first' | 'last' | 'step',
    pageNumber: number,
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['changePage'])

const attrs = useAttrs();

const className = computed(() => ({
    [props.type]: true,
    'active': props.active
}));

function clickHandler() {
    emit('changePage', props.pageNumber);
}
</script>