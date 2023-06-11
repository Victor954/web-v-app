<template>
    <Modal ref="modalRef">
        <template #header>
            <h5 class="modal-title">Изменение пароля</h5>
        </template>
        <template #body>
            <div class="d-flex gap-2 align-items-center">
                <Icon icon="warning" style-type="round" class="text-warning fs-4"></Icon>
                <p class="mb-0">При смене пароля старый восстановить будет нельзя.</p>
            </div>
        </template>
        <template #footer="{ resolve }">
            <Button type="button" style-type="secondary" data-bs-dismiss="modal" @click="resolve(false)">Отмена</Button>
            <Button type="button" style-type="warning" @click="resolve(true)">Принять</Button>
        </template>
    </Modal>
    <div class="input-group">
        <Input name="password" placeholder="Введите пароль" class="p-1" />
        <Button type="button" style-type="secondary" outline @click="clickLockHandler">
            <Icon :icon="lockIcon" style-type="outlined" />
        </Button>
    </div>
</template>
<script setup lang="ts">
import { ModalRef } from '@/assets/modal/types';
import { ref, computed } from 'vue';

const isLock = ref<boolean>(true);
const modalRef = ref<ModalRef>();

const lockIcon = computed(() => isLock.value ? 'lock' : 'lock_open');

async function clickLockHandler() {

    if (isLock.value) {
        const isApply = await modalRef.value?.show();

        if (isApply) {
            isLock.value = false;
            modalRef.value?.hide();
        }
    } else {
        isLock.value = true;
    }
}

</script>
<style scoped lang="scss">
:deep(.btn) {
    padding: 0rem .5rem;
    display: flex;
    align-items: center;
}

:deep(i) {
    font-size: 18px;
}
</style>