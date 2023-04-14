<template>
    <Transition name="loader">
        <div class="loader" v-if="loading"></div>
    </Transition>
</template>
<script lang="ts" setup>
import { Transition, defineProps } from 'vue';

type Props = {
    loading: boolean
}

const props = defineProps<Props>();

</script>
<style scoped lang="scss">
.loader-enter-active {
    animation: width-in 2s;
}

.loader-leave-active {
    animation: fade-out 2s;
}

@keyframes width-in {
    0% {
        width: 0%;
    }

    50% {
        width: 50%;
    }

    100% {
        width: 100%;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.loader {
    height: 10px;
    box-shadow: 0rem 0rem .5rem $blue-200;
    background: linear-gradient(90deg, $blue-200 0%, $blue-400 100%);
}
</style>