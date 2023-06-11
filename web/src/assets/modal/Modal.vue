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
import { ref } from 'vue';

import { ModalRef } from './types';
import EventBus from '@/helpers/EventBus';

const modalElementRef = ref<HTMLDivElement>()
const modal = ref<Modal>();

const resolveEvent = new EventBus<any>();

function resolve(arg: any) {
    resolveEvent.trigger(arg);
}

async function show() {

    if (modalElementRef.value && !modal.value) {
        modal.value = new Modal(modalElementRef.value);
    }

    modal.value?.show();

    return await new Promise((resolve) => {
        resolveEvent.on(handlerEventAsync(resolve));
    });
}

function handlerEventAsync(resolve: (value: unknown) => void) {
    const callback = (arg: any) => {
        resolve(arg);
        resolveEvent.off(callback);
    }

    return callback;
}

function hide() {
    modal.value?.hide();
}

defineExpose<ModalRef>({
    hide,
    show
});

</script>