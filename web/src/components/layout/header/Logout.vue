<template>
    <Button style-type="secondary" class="logout" outline @click="clickLogoutHandler">
        <Icon icon="logout" class="logout__icon" />
    </Button>
</template>
<script lang="ts" setup>
import { useAuthorizeStore } from '@/store/authorizeStore';
import { useRouter } from 'vue-router';

const authorize = useAuthorizeStore();
const router = useRouter();

async function clickLogoutHandler() {
    const result = await authorize.fetchLogout();
    !result && router.push('/login');
}

</script>
<style scoped lang="scss">
.logout {
    display: flex;
    align-items: center;
    height: 35px;
    padding: .8rem .5rem;
    margin-left: 1rem;

    .logout__icon {
        font-size: 16px;
    }
}
</style>