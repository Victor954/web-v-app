<template>
    <article class="container-fluid h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12">
                <section class="row mb-4">
                    <PageTitle label="Вход" icon="person" class="justify-content-center" />
                </section>
                <section class="row justify-content-center">
                    <div class="col-3">
                        <Form class="d-flex flex-column gap-2" @submit-form="submitLoginHandler">
                            {{ console.log(rules) }}
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]">
                                <FormLabel>Логин</FormLabel>
                                <Input name="login" type="text" placeholder="Ввелите логин" :disabled="isFetching" />
                            </Validate>
                            <Validate :rules="[rules.required, rules.alphanumeric, rules.length(6, 35)]">
                                <FormLabel>Пароль</FormLabel>
                                <PasswordInput name="password" :disabled="isFetching" />
                            </Validate>

                            <div class="d-flex align-items-center mt-3 gap-3">
                                <Button type="submit" style-type="primary" :disabled="isFetching">
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
import { computed, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

import rules from '@/components/form/validation/rules';

import { useAuthorizeStore } from '@/store/authorizeStore';
import { LoginReq } from '@/types/request/authorize.req.types';
import { useRouter } from 'vue-router';

const authStore = useAuthorizeStore();
const { query } = storeToRefs(authStore);

const router = useRouter();

const queryState = computed(() => query?.value?.state);
const isFetching = computed(() => queryState.value === 'pending');

watchEffect(() => {
    if (queryState.value === 'fulfilled') {
        router.push('/');
    }
})

function submitLoginHandler(formModel: LoginReq) {
    authStore.fetchLogin(formModel);
}
</script>