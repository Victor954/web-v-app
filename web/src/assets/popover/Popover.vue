<template>
    <Teleport v-if="containerHasReady" :to="`div[aria-label=${popupManager!.popupId.value}]`">
        <slot :update="update"></slot>
    </Teleport>
</template>

<script setup lang="ts">
import { Popover } from 'bootstrap';
import { onMounted, onUnmounted, ref, inject } from 'vue';
import { PopoverManager, PopoverRef } from './types';

const popupManager = inject<PopoverManager>('popoverManager');
const containerHasReady = ref<boolean>(false);
const popover = ref<Popover | null>(null);

onMounted(() => {
    document.addEventListener('show.bs.popover', showPopoverHandler);
});

onUnmounted(() => {
    document.removeEventListener('show.bs.popover', showPopoverHandler);
});

function showPopoverHandler({ target }: Event) {

    const isCurrentTarget =
        target instanceof HTMLElement &&
        target.dataset.popupid === popupManager!.popupId.value;

    containerHasReady.value = isCurrentTarget;
}

function show(element: HTMLElement) {

    containerHasReady.value && dispose();

    popover.value = new Popover(element, {
        html: true,
        content: `<div aria-label="${popupManager!.popupId.value}"></div>`
    });

    popover.value.show();
}

function update() {
    popover.value?.update()
}

function dispose() {
    if (popover.value) {
        containerHasReady.value = false;
        popover.value.dispose();
    }
}

defineExpose<PopoverRef>({
    containerHasReady,
    show,
    update,
    dispose
})
</script>