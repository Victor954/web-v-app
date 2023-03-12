<template>
    <article class="menu_info">
        <button class="navbar-toggler" type="button" @click="$event => emit('clickToggle', $event)">
            <MaterialIcon size="2xl" icon="menu"></MaterialIcon>
        </button>
        <a class="navbar-brand" href="#">Logo</a>
    </article>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue';
import MaterialIcon from '@/assert/icons/MaterialIcon.vue';

const emit = defineEmits(['clickToggle']);

</script>
<style scoped lang="scss">
.menu_info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .navbar-brand {
        font-size: $navbar-brand-font-size;
    }

    .navbar-toggler {
        display: block;
        padding: 0rem;
        border: none;
        transition: color .2s;

        &:focus {
            outline: none;
            box-shadow: none;
        }

        &:hover {
            color: $blue-300;
        }
    }
}
</style>