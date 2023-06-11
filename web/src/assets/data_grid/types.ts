import EventBus from "@/helpers/EventBus";
import { ComputedRef, DeepReadonly, Ref } from "vue";

export type Column = {
    text: string,
    width: string
}

export type Row = {
    data: Record<string , any>;
    index: number;
}

export type DataGridActionState = 'update' | 'insert' | 'delete';

export type StateRow = 'edit' | 'select' | 'delete' | 'default';

export type SubmitFormModelEvent = { 
    actionCode: Exclude<DataGridActionState , 'delete'> , 
    formModel: Record<string , any> 
}

export type PaginationDto = {
    totalCount: DeepReadonly<ComputedRef<number>>;
    itemPageCount: DeepReadonly<ComputedRef<number>>;
    pageChangedEvent: EventBus<number>;
}

export type LoadDataEvent = {
    offset: number;
    limit: number;
}

export type DataGridManager = {
    pagination: PaginationDto,
    selectedIndexes: DeepReadonly<Ref<number[]>>,
    removedIndex: DeepReadonly<Ref<number[]>>,
    editedIndex: DeepReadonly<Ref<number | null>>,
    saveEvent: EventBus<DataGridActionState>;
    submitFormModelEvent: EventBus<SubmitFormModelEvent>,
    resetSelect: () => void;
    resetEdit: () => void;
    resetDelete: () => void;
    setDelete: (rowIndexes: number[]) => void;
    setEdit: (rowIndex: number) => void; 
}