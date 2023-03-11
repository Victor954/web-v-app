<template>
    <div :class="classObject">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header"></slot>
                <button type="button" class="btn-close" data-bs-dismiss="modal">
                    <MaterialIcon icon="close" />
                </button>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import MaterialIcon from '../icons/MaterialIcon.vue';

const modal = inject<{
    options: {
        placement?: 'top' | 'center';
        size?: 'xl' | 'lg' | 'sm' | 'md'
    }
}>('modal');

const placementClass = computed(() => {

    switch (modal?.options.placement) {
        case 'center':
            return 'modal-dialog-centered';
        default:
            return '';
    }
});

const sizeClass = computed(() => modal?.options.size ? `modal-${modal?.options.size}` : '');

const classObject = computed(() => {
    return {
        'modal-dialog': true,
        [placementClass.value]: placementClass.value,
        [sizeClass.value]: sizeClass.value
    }
});
</script>