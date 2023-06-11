<template>
    <section class="container">
        <div class="row">
            <PageTitle label="Пользователи"></PageTitle>
            <UsersTable />
        </div>
    </section>
</template>
<script setup lang="ts">
import UsersTable from './components/users/UsersTable.vue';
</script>