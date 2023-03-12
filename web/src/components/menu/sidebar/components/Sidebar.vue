<template>
    <Transition name="slideLeft">
        <div v-if="isVisible" class="sidebar shadow-lg">
            <Header @on-toggle="hide"></Header>
            <User />
            <Menu></Menu>
            <Footer></Footer>
        </div>
    </Transition>
    <Transition name="fade">
        <span v-if="isVisible" class="shadow" @click="hide"></span>
    </Transition>
</template>
<script lang="ts" setup>
import { defineExpose, onMounted, onUnmounted, defineProps, ref, withDefaults, Transition } from 'vue';

import Menu from './Menu.vue';
import User from './User.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

const keyEscape = '27';

type Props = {
    isVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isVisible: false
});

const isVisible = ref<boolean>(props.isVisible);

onMounted(() => {
    document.addEventListener('keydown', handleEscape(hide));
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape(hide));
});

function handleEscape(callback: (event: KeyboardEvent) => void) {
    return (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            callback(event);
        }
    }
}

function hide() {
    isVisible.value = false;
}

function show() {
    isVisible.value = true;
}

defineExpose({
    hide,
    show
})

</script>
<style scoped lang="scss">
@import '@/scss/transitions';
@import '@/scss/mixins';

$widthSidebar: 20%;

@include leftSlide($widthSidebar);

.sidebar {
    display: flex;
    width: $widthSidebar;
    position: absolute;
    z-index: 999;
    flex-flow: column;
    height: 100vh;
    background-color: $blue-200;
}

.shadow {
    background-color: transparentize($gray-800 , .5);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 998;
}
</style>