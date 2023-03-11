<template>
    <ModalTemplate>
        <template #header>
            <Header></Header>
        </template>
        <template #body>

            <Body ref="bodyRef" @form-invalid="invalidHandler" @form-submit="submitHandler"></Body>
        </template>
        <template #footer>
            <Footer @save="callSaveHandler" @close="callCancelHandler"></Footer>
        </template>
    </ModalTemplate>
</template>
<script lang="ts" setup>

import { BodyExpose } from '@/domain/client/people/edit.types';

import { ref, inject } from 'vue'
import ModalTemplate from '@/assert/modal/ModalTemplate.vue';
import { Footer, Body, Header } from './index';

const modal = inject<{
    close: () => void;
}>('modal');

const bodyRef = ref<BodyExpose>();

function invalidHandler(errorModel: any) {
    console.log(errorModel);
}

function submitHandler(fromModel: any) {
    console.log(fromModel);
}

function callSaveHandler() {
    bodyRef.value!.form.trySubmitForm();
}

function callCancelHandler() {
    modal?.close();
}

</script>