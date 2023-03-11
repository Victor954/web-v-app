<template>
    <form class="needs-validation">
        <slot></slot>
    </form>
</template>
<script lang="ts" setup>
import { defineExpose, provide, defineEmits } from 'vue';

import { useFromStore } from './store/form.store';
import _ from 'lodash';
import EventObserver from '@/helpers/EventObserver';

const formStore = useFromStore();

const triggerEvent = new EventObserver();

const emit = defineEmits(['formSubmit', 'formInvalid'])

const setFieldActionHandler = _.debounce(({ name, store }) => {
    if (name === 'setField') {
        store.hasAnyError ? emit('formInvalid') : emit('formSubmit', store.formModel);
    }
}, 0);

function trySubmitForm() {
    triggerEvent.broadcast(undefined);
}

formStore.$onAction(setFieldActionHandler)

provide('triggerEvent', triggerEvent);

defineExpose({
    trySubmitForm
})

</script>