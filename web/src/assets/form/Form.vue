<template>
    <form @submit.prevent="submit">
        <slot></slot>
    </form>
</template>
<script setup lang="ts">
import { reactive, provide, readonly, onBeforeMount, onUnmounted, toRaw } from 'vue';
import { FormStateModel, FormValidationModel, FormControl, FromRef } from './types';
import EventBus from '@/helpers/EventBus';

type Props = {
    defaultValues?: Record<string, any>
}

const emits = defineEmits(['submit-form']);

const props = withDefaults(defineProps<Props>(), {
    defaultValues: () => ({})
});

const fromModel = reactive<Record<string, any>>(props.defaultValues);
const formValidationModel = reactive<FormValidationModel>({});
const formStateModel = reactive<FormStateModel>({});

const changeFormModelEvent: EventBus<[string, any]> = new EventBus();

onBeforeMount(() => {
    changeFormModelEvent.on(changedFormModelHandler);
})

onUnmounted(() => {
    changeFormModelEvent.off(changedFormModelHandler);
})

function changeFormModel([name, value]: Parameters<FormControl['change']>[0]) {
    changeFormModelEvent.trigger([name, value]);
}

function changedFormModelHandler([name, value]: Parameters<FormControl['change']>[0]) {
    fromModel[name] = value;

    const validationField = formValidationModel[name];

    if (!validationField) return;

    if (validationField.bindings.length > 0) {
        [name, ...validationField.bindings].forEach((name) => {
            validFiled(name, value);
        });
    } else {
        validFiled(name, value);
    }
}

function submit() {
    const isValid = validForm();

    if (isValid) {

        Object.keys(formStateModel).forEach((name) => {
            formStateModel[name] = 'sended';
        });

        const rawFromModel = toRaw(fromModel);

        emits('submit-form', rawFromModel);
        return rawFromModel;
    }

    return false;
}

function validForm() {

    let hasInvalid = false;

    Object.keys(formValidationModel).forEach((name) => {
        const value = fromModel[name] || '';
        const isInvalid = validFiled(name, value);

        if (isInvalid && !hasInvalid) {
            hasInvalid = true;
        }
    });

    return !hasInvalid;
}

function validFiled(name: string, value: string) {
    const validator = formValidationModel[name];
    const isInvalid = validator.rules.find(([validFn]) => !validFn(value, readonly(fromModel)))?.[1] || false;

    formStateModel[name] = isInvalid ? ['error', isInvalid] : 'pending';

    return isInvalid;
}

function setErrors(errorMsg: string, fieldsName?: string[]) {

    Object.keys(formStateModel)
        .filter(fieldName => fieldsName ? fieldsName.includes(fieldName) : true)
        .forEach(fieldName => {
            formStateModel[fieldName] = ['error', errorMsg];
        });
}

provide('formValidationModel', formValidationModel);
provide('formModel', readonly(fromModel));
provide('formStateModel', readonly(formStateModel));

provide<FormControl>('formControl', readonly({
    change: changeFormModel
}));

defineExpose<FromRef>({
    submitForm: submit,
    validForm,
    setErrors
});
</script>