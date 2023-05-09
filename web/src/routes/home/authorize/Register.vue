<template>
    <article class="container-fluid h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <section class="row mb-4">
                    <PageTitle label="Регистрация" icon="person_add" class="justify-content-center" />
                </section>
                <section class="row justify-content-center">
                    <div class="col-3">
                        <Form class="d-flex flex-column gap-2" ref="formRef" @submit-form="submitHandler">
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]">
                                <FormLabel>Логин</FormLabel>
                                <Input name="login" type="text" placeholder="Ввелите логин" :disabled="disabledForm" />
                            </Validate>
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(6, 35), equalsPasswords]"
                                :bindFields="['repeatedPassword']">
                                <FormLabel>Пароль</FormLabel>
                                <PasswordInput name="password" :disabled="disabledForm" />
                            </Validate>
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(6, 35), equalsPasswords]"
                                :bindFields="['password']">
                                <FormLabel>Повторите пароль</FormLabel>
                                <PasswordInput name="repeatedPassword" :disabled="disabledForm" />
                            </Validate>
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

import rules from '@/components/form/validation/rules';
import { Validation } from '@/components/form/validation/types';

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