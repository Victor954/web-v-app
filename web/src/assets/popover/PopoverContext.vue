<template>
    <Popover ref="popoverRef">
        <slot name="popover"></slot>
    </Popover>
    <slot name="content" :show="show" :attrs="{ 'aria-label': popupId }"></slot>
</template>
<script setup lang="ts">
import { provide, ref, onMounted, onUnmounted } from 'vue';
import { PopoverManager, PopoverRef } from './types';
import Popover from './Popover.vue';

const popoverRef = ref<PopoverRef>();
const showCounter = ref<number>(0);
const popupId = ref<string>(generatePopupId());

onMounted(() => {
    document.addEventListener('click', clickPopoverHandler);
});

onUnmounted(() => {
    document.removeEventListener('click', clickPopoverHandler);
});

function clickPopoverHandler({ target }: Event) {

    const isNotPopupElement = target instanceof HTMLElement && !target.closest(`[aria-label=${popupId.value}]`);
    const popupHasOpened = popoverRef.value && popoverRef.value.containerHasReady;

    if (isNotPopupElement && popupHasOpened) {
        popoverRef.value?.dispose();
    }
}

function show(element: HTMLElement) {

    showCounter.value++;

    const id = generatePopupId();

    popupId.value = id;
    element.dataset.popupid = id;

    popoverRef.value?.show(element)
}

function generatePopupId() {
    return `bsp_${Date.now()}_${showCounter.value}`;
}

provide<PopoverManager>('popoverManager', {
    popupId: popupId
});
</script>