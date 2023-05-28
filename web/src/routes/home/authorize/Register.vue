<template>
    <article class="container-fluid h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <section class="row mb-4">
                    <PageTitle label="Регистрация" icon="person_add" class="justify-content-center" />
                </section>
                <section class="row justify-content-center">
                    <div class="col-7">
                        <Form class="d-flex flex-column gap-2 w-100" ref="formRef" @submit-form="submitHandler">
                            <div class="d-flex gap-5 w-100">
                                <div class="d-flex flex-column w-50 border px-4 pt-4 pb-5 rounded gap-2">
                                    <div class="d-flex mb-3 align-items-end gap-2">
                                        <h4>1:</h4>
                                        <h5 class="fw-normal">ФИО</h5>
                                    </div>
                                    <Validate :rules="[rules.required, rules.cyrillic, rules.length(2, 50)]">
                                        <FormLabel>Имя</FormLabel>
                                        <Input name="name" type="text" placeholder="Ввелите логин"
                                            :disabled="disabledForm" />
                                    </Validate>
                                    <Validate :rules="[rules.required, rules.cyrillic, rules.length(3, 100)]">
                                        <FormLabel>Фамилия</FormLabel>
                                        <Input name="surname" type="text" placeholder="Ввелите логин"
                                            :disabled="disabledForm" />
                                    </Validate>
                                    <Validate :rules="[rules.cyrillic, rules.length(3, 100)]">
                                        <FormLabel>Отчество</FormLabel>
                                        <Input name="patronymic" type="text" placeholder="Ввелите логин"
                                            :disabled="disabledForm" />
                                    </Validate>
                                    <FormInfo>Отчество не обязательно*</FormInfo>
                                </div>
                                <div class="d-flex flex-column w-50 border px-4 pt-4 pb-5 rounded gap-2">
                                    <div class="d-flex mb-3 align-items-end gap-2">
                                        <h4>2:</h4>
                                        <h5 class="fw-normal">Логин и пароль</h5>
                                    </div>
                                    <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]">
                                        <FormLabel>Логин</FormLabel>
                                        <Input name="login" type="text" placeholder="Ввелите логин"
                                            :disabled="disabledForm" />
                                    </Validate>
                                    <Validate
                                        :rules="[rules.required, rules.alphanumeric, rules.length(6, 35), equalsPasswords]"
                                        :bindFields="['repeatedPassword']">
                                        <FormLabel>Пароль</FormLabel>
                                        <PasswordInput name="password" :disabled="disabledForm" />
                                    </Validate>
                                    <Validate
                                        :rules="[rules.required, rules.alphanumeric, rules.length(6, 35), equalsPasswords]"
                                        :bindFields="['password']">
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <PasswordInput name="repeatedPassword" :disabled="disabledForm" />
                                    </Validate>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mt-3 gap-3">
                                <Button type="submit" style-type="primary" :disabled="disabledForm">
                                    Регистрация
                                </Button>
                                <RouterLink to="/login">
                                    Войти
                                </RouterLink>
                            </div>
                        </Form>
                    </div>
                </section>
            </div>
        </div>
    </article>
</template>
<script setup lang="ts">
import validator from 'validator';

import rules from '@/assets/form/validation/rules';
import { Validation } from '@/assets/form/validation/types';

const equalsPasswords: Validation = [
    (str: string, formState) => validator.equals(
        formState['password'],
        formState['repeatedPassword']
    ),
    'Пароли должны совпадать'
];

import { useFetchForm } from '@/helpers/authorize';
import { RegisterReq } from '@/types/request/authorize.req.types';

const {
    disabledForm,
    formRef,
    submitHandler
} = useFetchForm<RegisterReq>({
    successRedirect: '/',
    fetchAsync: (formModel, store) => store.fetchRegister(formModel)
});
</script>