<template>
    <Teleport to="body">
        <div class="modal fade" ref="modelElementRef" tabindex="-1" aria-hidden="true">
            <slot></slot>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, provide, withDefaults, defineExpose } from 'vue';
import Modal from 'bootstrap/js/dist/modal';

type Props = {
    placement?: 'top' | 'center';
    size?: 'xl' | 'lg' | 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
    placement: 'center',
    size: 'lg'
})

const modal = ref<Modal | null>(null);

const modelElementRef = ref<HTMLDivElement>();

onMounted(() => {
    if (modelElementRef.value) {
        modal.value = new Modal(modelElementRef.value, {});
    }
});

function open() {
    modal.value?.show();
}

function close() {
    modal.value?.hide();
}

const modalManage = {
    open,
    close,
    options: {
        ...props
    }
}

provide('modal', modalManage);

defineExpose(modalManage);

</script>