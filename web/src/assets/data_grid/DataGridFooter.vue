<template>
    <div class="tfooter">
        <Form :defaultValues="$props.mapDefaultValues!(null)" class="tr border-bottom-0" v-if="hasInsert" ref="insertForm">
            <slot name="form"></slot>
        </Form>
        <span class="tr">
            <div class="td w-100 align-items-center justify-content-between control">
                <article>
                    <Pagination v-if="pagination.totalCount.value > pagination.itemPageCount.value"
                        :total-count="pagination.totalCount.value" :items-page-count="pagination.itemPageCount.value"
                        @page-changed="(page) => pagination.pageChangedEvent.trigger(page)" />
                </article>
                <article class="d-flex h-100 align-items-center gap-3 fs-5">
                    <div class="d-flex">
                        <Button style-type="danger" :disabled="!hasSelect" inline @click="clickDeleteHandler">
                            <Icon icon="delete" style-type="outlined" />
                        </button>
                        <Button style-type="secondary" :disabled="!hasSelect || !hasSelectOne" inline
                            @click="clickEditHandler">
                            <Icon icon="edit" />
                        </Button>
                        <Button v-if="!hasInsert" :disabled="disabledAllowInsert" style-type="secondary" inline
                            @click="clickAllowInsertHandler">
                            <Icon icon="add" />
                        </Button>
                    </div>
                    <div v-if="hasSave" class="d-flex rounded control_changes">
                        <Button style-type="success" inline @click="clickSaveHandler">
                            <Icon icon="save" style-type="outlined" />
                        </Button>
                        <Button style-type="secondary" inline @click="clickCancelHandler">
                            <Icon icon="cancel" style-type="outlined" />
                        </Button>
                    </div>
                </article>
            </div>
        </span>
    </div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { DataGridActionState, DataGridManager } from './types';
import { FromRef } from '../form/types';
import Pagination from '../pagination/Pagination.vue';

type Props = {
    mapDefaultValues: (data: Record<string, any> | null) => Record<string, any>
}

defineProps<Props>();

const dataGridManager = inject<DataGridManager>('dataGrid');

const disabledAllowInsert = ref<boolean>(false);
const insertForm = ref<FromRef>();

const hasInsert = ref<boolean>(false);
const hasSave = ref<boolean>(false);

const pagination = computed(() => dataGridManager!.pagination);

const hasEdit = computed(() => dataGridManager?.editedIndex.value !== null);
const hasRemove = computed(() => !!dataGridManager && dataGridManager.removedIndex.value.length > 0);
const hasSelect = computed(() => !!dataGridManager && dataGridManager.selectedIndexes.value.length > 0);
const hasSelectOne = computed(() => !!dataGridManager && dataGridManager.selectedIndexes.value.length === 1);

watchEffect(() => {
    if (hasEdit.value) {
        hasSave.value = true;
        hasInsert.value = false;
    }
});

onMounted(() => {
    dataGridManager?.saveEvent.on(saveEventHandler);
});

onUnmounted(() => {
    dataGridManager?.saveEvent.off(saveEventHandler);
})

function saveEventHandler(actionCode: DataGridActionState) {

    if (actionCode === 'insert') {
        const formResult = insertForm.value?.submitForm();
        formResult && dataGridManager?.submitFormModelEvent.trigger({ actionCode, formModel: formResult });
        resetState();
    }
}

function clickEditHandler() {
    dataGridManager?.setEdit(dataGridManager.selectedIndexes.value[0]);
}

function clickDeleteHandler() {
    hasSave.value = true;
    hasInsert.value = false;
    disabledAllowInsert.value = true;

    dataGridManager?.setDelete(dataGridManager.selectedIndexes.value as number[]);
}

function clickAllowInsertHandler() {
    hasInsert.value = true;
    hasSave.value = true;

    dataGridManager?.resetEdit();
}

function clickSaveHandler() {

    let actionCode: DataGridActionState | null = null;

    if (hasInsert.value) {
        actionCode = 'insert';
    }

    if (hasEdit.value) {
        actionCode = 'update';
    }

    if (hasRemove.value) {
        actionCode = 'delete';
    }

    if (actionCode) {
        dataGridManager?.saveEvent.trigger(actionCode);
        resetState();
    }
}

function clickCancelHandler() {
    resetState();
}

function resetState() {
    hasInsert.value = false;
    hasSave.value = false;
    disabledAllowInsert.value = false;

    dataGridManager?.resetDelete();
    dataGridManager?.resetEdit();
}

</script>
<style scoped lang="scss">
.control {
    .control_changes {
        background-color: $gray-100;
        border: solid 1px $gray-300;
        padding: 0rem .5rem;
    }

    :deep(button),
    :deep(i) {
        font-size: inherit;
    }
}
</style>