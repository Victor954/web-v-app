<template>
    <Teleport to="body">
        <div class="modal" tabindex="-1" ref="modalElementRef">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer" :resolve="resolve"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script setup lang="ts">

import { Modal } from 'bootstrap';
import { ref, onMounted, onUnmounted } from 'vue';

import { ModalRef } from './types';
import EventBus from '@/helpers/EventBus';

const modalElementRef = ref<HTMLDivElement>()
const modal = ref<Modal>();
let hasResolved = true;

const resolveEvent = new EventBus<any>();

onMounted(() => {
    document.addEventListener('hidden.bs.modal', hiddenModalHandler);
});

onUnmounted(() => {
    document.removeEventListener('hidden.bs.modal', hiddenModalHandler);
});

function hiddenModalHandler() {

    if (!hasResolved) {
        resolve(null);
    }
}

async function show() {

    if (modalElementRef.value && !modal.value) {
        modal.value = new Modal(modalElementRef.value);
    }

    modal.value?.show();
    return await new Promise(lockForClientResolve);
}

function hide() {
    modal.value?.hide();
}

function lockForClientResolve(resolve: (value: unknown) => void) {

    hasResolved = false;

    const callback = (arg: any) => {
        resolve(arg);
        resolveEvent.off(callback);
        hasResolved = true;
    }

    resolveEvent.on(callback);
}

function resolve(arg: any) {
    resolveEvent.trigger(arg);
}

defineExpose<ModalRef>({
    hide,
    show
});

</script>