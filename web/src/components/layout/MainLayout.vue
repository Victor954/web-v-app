<template>
    <main class="layout">

        <Head @on-toggle="toggleMenuVisibleHandler" :menuVisible="menuVisible" />
        <div class="d-flex h-100 w-100">
            <Transition>
                <section v-if="menuVisible" class="layout_sidebar">
                    <SidebarMenu class="w-100" />
                </section>
            </Transition>
            <section class="layout_content">
                <slot></slot>
            </section>
        </div>
    </main>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Head from './header/Head.vue'
import SidebarMenu from './menu/SidebarMenu.vue';

const menuVisible = ref<boolean>(false);

function toggleMenuVisibleHandler() {
    menuVisible.value = !menuVisible.value;
}

</script>
<style scoped lang="scss">
$sidebarWidth: 25%;

.layout {
    height: 100%;
    display: flex;
    flex-direction: column;

    .layout_sidebar {
        height: inherit;
        width: $sidebarWidth;
    }

    .layout_content {
        height: inherit;
        width: 100%;
    }
}

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(-100%);
    opacity: .75;
}
</style>