<template>
    <li class="page-item">
        <a :class="classObj" data-test="page-link" @click="clickPageLinkHandler">
            {{ $props.number }}
        </a>
    </li>
</template>
<script lang="ts" setup>
import { withDefaults, computed } from 'vue';

type Props = {
    number?: string,
    active?: boolean,
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    number: '',
    active: false,
    disabled: false
});

const emit = defineEmits(['clickPage']);

function clickPageLinkHandler() {

    if (!props.active && !props.disabled) {
        emit('clickPage', Number(props.number))
    }
}

const classObj = computed(() => ({
    'page-link': true,
    'active': props.active,
    'disabled': props.disabled
}));

</script>
<style lang="scss" scoped>
.page-item {
    $spaceOutside: 1.5rem;
    $space: .5rem;

    &:first-of-type {
        margin-right: $spaceOutside;
    }

    &:last-of-type {
        margin-left: $spaceOutside;
    }

    margin: 0rem $space;

    .page-link {
        font-weight: 500;
        font-size: $font-size-sm;
        border-style: none;
        color: $gray-500;
        background-color: initial;

        .arrow-left {
            transform: rotate(180deg);
        }

        &:focus {
            box-shadow: none;
        }

        &:hover {
            background-color: initial;
            color: $gray-800;
        }
    }

    .page-link.active {
        @extend .page-link;

        color: $blue-300;
        border-bottom: solid 2px $blue-300;
    }
}
</style>