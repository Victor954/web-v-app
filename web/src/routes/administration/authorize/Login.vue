<template>
    <article class="container-fluid h-100">
        <div class="row h-100 align-items-center justify-content-center">
            <div class="col-4">
                <Card>
                    <section class="row mb-4">
                        <PageTitle label="Вход в систему управления" icon="shield" class="justify-content-center" />
                    </section>
                    <section class="row">
                        <div class="col-12">
                            <Form class="d-flex flex-column gap-2">
                                <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]">
                                    <FormLabel>Логин</FormLabel>
                                    <Input name="login" type="text" placeholder="Ввелите логин" />
                                </Validate>
                                <Validate :rules="[rules.required, rules.alphanumeric, rules.length(6, 35)]">
                                    <FormLabel>Пароль</FormLabel>
                                    <PasswordInput name="password" />
                                </Validate>

                                <div class="d-flex align-items-center justify-content-center mt-3 gap-3">
                                    <Button type="submit" style-type="primary">
                                        Войти
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </section>
                </Card>
            </div>
        </div>
    </article>
</template>
<script setup lang="ts">
import rules from '@/components/form/validation/rules';
</script>