<template>
    <header>
        <HeaderToggle @click-toggle="$event => emit('onToggle', $event)" />
    </header>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue'
import HeaderToggle from '../../HeaderToggle.vue';

const emit = defineEmits(['onToggle'])

</script>
<style scoped lang="scss">
header {
    background-color: $blue-200;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0rem $container-padding-x * 0.5;

    .menu_info {

        color: $white;

        ::v-deep .navbar-toggler {

            color: transparentize($color: $white, $amount: .3);

            &:hover {
                color: $white;
            }
        }
    }
}
</style>