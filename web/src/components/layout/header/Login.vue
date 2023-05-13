<template>
    <Button style-type="secondary" outline @onclick="clickLoginHandler">Войти</Button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function clickLoginHandler() {
    router.push('/login');
}

</script>