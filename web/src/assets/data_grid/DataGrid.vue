<template>
    <div>
        <Table :class="tableClass">
            <THead>
                <tr>
                    <th v-for="col in $props.columns" :style="{ width: col.width }">
                        {{ col.text }}
                    </th>
                </tr>
            </THead>
        </Table>
        <Scrollbar style="height: 300px">
            <div :class="[tableClass, 'table-hover']" style="height: 300px">
                <div class="tbody">
                    <DataGridRow v-if="$props.rows.length > 0" v-for="row in $props.rows" :data="row.data"
                        :index="row.index" :state="getRowState(row.index)" :mapDefaultValues="$props.mapDefaultValues!"
                        @click.exact="clickTableRowHandler(row.index)"
                        @click.ctrl.exact="clickCtrlTableRowHandler(row.index)"
                        @dblclick="dbClickTableRowHandler(row.index)">
                        <template #row>
                            <slot name="row" :data="row.data" :styles="rowStyles"></slot>
                        </template>
                        <template #form>
                            <slot name="form" :data="row.data" :styles="rowStyles"></slot>
                        </template>
                    </DataGridRow>
                    <div class="h-100 text-secondary fs-5 d-flex justify-content-center align-items-center border-end border-start"
                        v-else>
                        Нет данных
                    </div>
                </div>
            </div>
        </Scrollbar>
        <div :class="tableClass">
            <DataGridFooter :mapDefaultValues="$props.mapDefaultValues!">
                <template #form>
                    <slot name="form" :data="(null as Record<string, any> | null)" :styles="rowStyles"></slot>
                </template>
            </DataGridFooter>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, provide, readonly, ref, onMounted, onUnmounted } from 'vue';
import DataGridRow from './DataGridRow.vue';
import DataGridFooter from './DataGridFooter.vue';
import { Column, Row, StateRow, DataGridManager, DataGridActionState, SubmitFormModelEvent, LoadDataEvent } from './types';
import EventBus from '@/helpers/EventBus';

type Props = {
    mapDefaultValues?: (data: Record<string, any> | null) => Record<string, any>
    totalCount: number,
    itemPageCount: number
    columns: Column[],
    rows: Row[]
}

const props = withDefaults(defineProps<Props>(), {
    mapDefaultValues: (data: Record<string, any> | null) => data || {}
});

const emit = defineEmits(['loadData', 'insert', 'update', 'delete']);

const tableClass = 'table table-striped table-bordered table-responsive table-sm mb-0'

const saveEvent = new EventBus<DataGridActionState>();
const submitFormModelEvent = new EventBus<SubmitFormModelEvent>();
const pageChangedEvent = new EventBus<number>();

const selectedIndexes = ref<number[]>([]);
const deleteIndexes = ref<number[]>([]);
const editedIndex = ref<number | null>(null);
const tableIsActive = ref<boolean>(true);

const rowStyles = computed(() => props.columns.map(column => ({ width: column.width })));

const itemPageCount = computed(() => props.itemPageCount);
const totalCount = computed(() => props.totalCount);

onMounted(() => {
    submitFormModelEvent.on(submitFormModelEventHandler);
    saveEvent.on(saveEventHandler);
    pageChangedEvent.on(pageChangeEventHandler);

    emit('loadData', createLoadData(0));
});

onUnmounted(() => {
    submitFormModelEvent.off(submitFormModelEventHandler);
    saveEvent.off(saveEventHandler);
    pageChangedEvent.off(pageChangeEventHandler);
})

function submitFormModelEventHandler({ actionCode, formModel }: SubmitFormModelEvent) {
    emit(actionCode, formModel);
}

function pageChangeEventHandler(page: number) {
    emit('loadData', createLoadData(page));
}

function saveEventHandler(actionCode: DataGridActionState) {
    if (actionCode === 'delete') {
        emit(actionCode, [...deleteIndexes.value]);
    }
}

function clickTableRowHandler(rowIndex: number) {
    if (tableIsActive.value) {
        selectedIndexes.value = [rowIndex];
    }
}

function clickCtrlTableRowHandler(rowIndex: number) {
    if (tableIsActive.value) {

        if (selectedIndexes.value.includes(rowIndex)) {
            selectedIndexes.value = [...selectedIndexes.value.filter(selRowIndex => selRowIndex !== rowIndex)];
        } else {
            selectedIndexes.value = [...selectedIndexes.value, rowIndex];
        }
    }
}

function dbClickTableRowHandler(rowIndex: number) {
    setEdit(rowIndex);
}

function getRowState(index: number): StateRow {
    if (deleteIndexes.value.includes(index)) return 'delete';

    if (selectedIndexes.value.includes(index)) return 'select';

    if (editedIndex.value === index) return 'edit';

    return 'default'
}

function setEdit(rowIndex: number) {
    selectedIndexes.value = [];
    editedIndex.value = rowIndex;
    tableIsActive.value = false;
}

function setDelete(rowIndexes: number[]) {
    selectedIndexes.value = [];
    deleteIndexes.value = rowIndexes;
    tableIsActive.value = false;
}

function resetEdit() {
    editedIndex.value = null;
    tableIsActive.value = true;
}

function resetDelete() {
    deleteIndexes.value = [];
    tableIsActive.value = true;
}

function resetSelect() {
    selectedIndexes.value = [];
}

const createLoadData = (page: number): LoadDataEvent => ({
    skip: itemPageCount.value * page,
    top: itemPageCount.value
});

provide<DataGridManager>('dataGrid', {
    pagination: {
        pageChangedEvent: pageChangedEvent,
        itemPageCount: readonly(itemPageCount),
        totalCount: readonly(totalCount)
    },
    selectedIndexes: readonly(selectedIndexes),
    removedIndex: readonly(deleteIndexes),
    editedIndex: readonly(editedIndex),
    saveEvent,
    submitFormModelEvent,
    resetEdit,
    resetSelect,
    resetDelete,
    setDelete,
    setEdit
});

</script>