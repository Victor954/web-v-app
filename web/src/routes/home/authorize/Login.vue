<template>
    <article class="container-fluid h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <section class="row mb-4">
                    <PageTitle label="Вход" icon="person" class="justify-content-center" />
                </section>
                <section class="row justify-content-center">
                    <div class="col-3">
                        <Form class="d-flex flex-column gap-2" @submit-form="submitHandler" ref="formRef">
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]">
                                <FormLabel>Логин</FormLabel>
                                <Input name="login" type="text" placeholder="Ввелите логин" :disabled="disabledForm" />
                            </Validate>
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(8, 35)]">
                                <FormLabel>Пароль</FormLabel>
                                <PasswordInput name="password" :disabled="disabledForm" />
                            </Validate>

                            <div class="d-flex align-items-center mt-3 gap-3">
                                <Button type="submit" style-type="primary" :disabled="disabledForm">
                                    Войти
                                </Button>
                                <RouterLink to="/register">
                                    Регистрация
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
import rules from '@/assets/form/validation/rules';

import { useFetchForm } from '@/helpers/authorize';
import { LoginReq } from '@/types/request/authorize.req.types';

const {
    disabledForm,
    formRef,
    submitHandler
} = useFetchForm<LoginReq>({
    successRedirect: '/',
    fetchAsync: async (formModel, store) => store.fetchLogin(formModel)
});

</script>