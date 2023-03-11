<template>
    <label class="form-label">{{ $props.label }}</label>

    <input v-bind="$attrs" v-model="value" :class="[{ 'invalid': error?.hasError }, 'form-control']">

    <div class="invalid-feedback">
        {{ error?.message }}
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, onMounted, onUnmounted, ref, inject, watch, useAttrs } from 'vue';
import { ErrorForm, RuleFn } from '@/domain/client/form.types';
import { useFromStore } from '../store/form.store';
import _ from 'lodash';
import { validator } from '@/helpers/validation';
import EventObserver from '@/helpers/EventObserver';

type Props = {
    label?: string,
    defaultValue?: string,
    rules?: RuleFn[]
};

const triggerEvent = inject<EventObserver<Function, unknown>>('triggerEvent');
const attrs = useAttrs();

const props = withDefaults(defineProps<Props>(), {
    label: '',
    defaultValue: '',
});

const formStore = useFromStore();

const value = ref<string>(props.defaultValue);

const error = ref<ErrorForm>({
    hasError: false,
    message: ''
});

onMounted(() => {
    triggerEvent?.subscribe(triggerEventHandler);
});

onUnmounted(() => {
    triggerEvent?.unsubscribe(triggerEventHandler);
});

const watchValueHandler = _.debounce(validation, 600);

function triggerEventHandler() {

    validation(value.value);
    formStore.setField(attrs.name as string, {
        value: value.value,
        error: error.value
    });
}

function validation(value: string) {
    const validate = validator(value, props.rules || []);

    error.value = {
        hasError: typeof validate === 'string',
        message: validate || ''
    };
}

watch(value, watchValueHandler);

</script>

<style scoped lang="scss">
.invalid {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);


    &:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);
    }

    &~.invalid-feedback {
        display: block;
    }
}

.invalid-tooltip {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: .875em;
    color: #dc3545;
}
</style>