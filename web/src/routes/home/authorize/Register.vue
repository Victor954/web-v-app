<template>
    <article class="container-fluid h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <section class="row mb-4">
                    <PageTitle label="Регистрация" icon="person_add" class="justify-content-center" />
                </section>
                <section class="row justify-content-center">
                    <div class="col-3">
                        <Form class="d-flex flex-column gap-2">
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]">
                                <FormLabel>Логин</FormLabel>
                                <Input name="login" type="text" placeholder="Ввелите логин" />
                            </Validate>
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(6, 35), equalsPasswords]"
                                :bindFields="['repeatPassword']">
                                <FormLabel>Пароль</FormLabel>
                                <PasswordInput name="password" />
                            </Validate>
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(6, 35), equalsPasswords]"
                                :bindFields="['password']">
                                <FormLabel>Повторите пароль</FormLabel>
                                <PasswordInput name="repeatPassword" />
                            </Validate>
                            <div class="d-flex align-items-center mt-3 gap-3">
                                <Button type="submit" style-type="primary">
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
        formState['repeatPassword']
    ),
    'Пароли должны совпадать'
];
</script>