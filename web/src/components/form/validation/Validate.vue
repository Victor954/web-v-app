<template>
    <FormGroup>
        <slot></slot>
        <FormInfo type="error" v-if="invalidValue">
            {{ invalidValue }}
        </FormInfo>
    </FormGroup>
</template>
<script setup lang="ts">
import { inject, onBeforeMount, useSlots, computed } from 'vue';
import { FormGroup, FormInfo } from '..';
import { Validation } from './types';
import * as FormControls from '../inputs';
import { FormStateModel, FormValidationModel } from '../types';

type Props = {
    rules: Validation[],
    bindFields?: string[]
}

const inputsTypes = Object.values(FormControls);
const slots = useSlots();

const nestedInputName = getFormControlName();

const props = defineProps<Props>()
const formValidModel = inject<FormValidationModel | null>('formValidationModel', null);
const formStateModel = inject<FormStateModel | null>('formStateModel', null);

const invalidValue = computed(() => {
    const state = nestedInputName && formStateModel?.[nestedInputName]

    if (typeof state !== 'string' && Array.isArray(state)) {
        return state[1];
    }

    return false;
});

onBeforeMount(() => {
    if (formValidModel && nestedInputName) {
        formValidModel[nestedInputName] = {
            bindings: props.bindFields || [],
            rules: props.rules
        };
    }
});

function getFormControlName(): string | undefined {
    const defaultSlot = slots.default?.();
    const controller = defaultSlot?.find(({ type }) => inputsTypes.includes(type as any));

    return controller?.props?.name;
}

</script>