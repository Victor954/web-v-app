<template>
    <FormModify ref="formRef" />
</template>

<script lang="ts" setup>
import { FormExpose } from '../types';
import { defineExpose, ref } from 'vue';

import FormModify from '../body/FormModify.vue';

const formRef = ref<FormExpose>();

defineExpose({
    form: {
        trySubmitForm: () => formRef.value?.trySubmitForm()
    }
});

</script>