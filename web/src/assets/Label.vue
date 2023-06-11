<template>
    <span :class="['rounded px-2', className]" @click="clickHandler">
        <Icon v-if="$props.hasRemove" @click="emit('delete')" icon="close"></Icon>
        <slot></slot>
    </span>
</template>
<script setup lang="ts">
import { computed } from 'vue';

type Props = {
    hasRemove?: boolean,
    hasClick?: boolean
}

const emit = defineEmits(['delete', 'click']);

const props = defineProps<Props>();
const className = computed(() => props.hasClick ? 'live' : 'static');

function clickHandler() {
    props.hasClick && emit('click');
}

</script>
<style scoped lang="scss">
span.static {
    background-color: $blue-100;
    color: $blue-800;
    border: solid 1px $blue-300;
    display: flex;
    gap: .2rem;

    :deep(i) {
        color: #95acd1;
        display: flex;
        align-items: center;
        font-size: 16px;

        &:hover {
            cursor: pointer;
            color: darken($color: #95acd1, $amount: 10);
        }
    }
}
</style>