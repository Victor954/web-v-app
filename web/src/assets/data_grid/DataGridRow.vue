<template>
    <div :class="tableRowClass" v-if="$props.state !== 'edit'">
        <slot name="row"></slot>
    </div>
    <Form ref="updateForm" :defaultValues="mapDefaultValues($props.data)"
        :class="[tableRowClass, 'border-bottom-0 tr-selected']" v-else>
        <slot name="form"></slot>
    </Form>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';
import { DataGridActionState, DataGridManager, StateRow } from './types';
import { FromRef } from '../form/types';

type Props = {
    index: number;
    data: Record<string, any>;
    state: StateRow;
    mapDefaultValues: (data: Record<string, any> | null) => Record<string, any>;
}

const props = defineProps<Props>();

const dataGridManager = inject<DataGridManager>('dataGrid');

const updateForm = ref<FromRef>();

const tableRowClass = computed(() => ({
    'tr-selected': props.state === 'select',
    'tr-danger': props.state === 'delete',
    'tr': true
}));

onMounted(() => {
    dataGridManager?.saveEvent.on(saveEventHandler);
});

onUnmounted(() => {
    dataGridManager?.saveEvent.off(saveEventHandler);
})

function saveEventHandler(actionCode: DataGridActionState) {

    if (actionCode === 'update') {
        const formResult = updateForm.value?.submitForm();
        formResult && dataGridManager?.submitFormModelEvent.trigger({ actionCode, formModel: formResult });
    }
}

</script>
<style scoped lang="scss">
.tr-selected {
    background-color: $yellow-100;
}

.tr-danger {
    background-color: $red-100;
}
</style>