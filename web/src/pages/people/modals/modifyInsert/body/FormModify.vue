<template>
    <div class="form-container">
        <Form ref="formRef" @form-submit="submitHandler">
            <div class="mb-3">
                <Input label="Имя" :rules="filedRules" name="name" placeholder="Введите имя" />
            </div>
            <div class="mb-3">
                <Input label="Фамилия" :rules="filedRules" name="surname" placeholder="Введите фамилию" />
            </div>
            <div class="mb-3">
                <Input label="Отчество" :rules="filedRules" name="patronymic" placeholder="Введите отчество" />
            </div>
        </Form>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineExpose } from 'vue'
import validator from 'validator';

import Input from '@/assert/from/inputs/Input.vue';
import Form from '@/assert/from/Form.vue';

import { required, rule } from '@/helpers/validation';
import { FormExpose } from '@/domain/client/form.types';

const formRef = ref<FormExpose>();

const filedRules = computed(() => [
    required('Поле обязательно для заполнения'),
    rule((value) => validator.isAlpha(value, 'ru-RU'), 'Только буквы')
]);

function submitHandler(formModel: {
    name: string,
    surname: string,
    patronymic: string
}) {
    console.log(formModel);
}

function trySubmitForm() {
    formRef.value?.trySubmitForm();
}

defineExpose({
    trySubmitForm
});
</script>