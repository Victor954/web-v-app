<template>
    <article class="d-flex align-items-center gap-2" v-if="hasAuthorized">
        <section>
            {{ personInfo }}
        </section>
        <div class="user border rounded-circle">
            <Icon icon="person" />
        </div>
        <Logout />
    </article>
    <article v-else>
        <Login />
    </article>
</template>
<script lang="ts" setup>
import { useAuthorizeStore } from '@/store/authorizeStore';
import { PersonInfo } from '@/types/authorize.res.types';
import { computed } from 'vue';

import Logout from './Logout.vue';
import Login from './Login.vue';

const authorize = useAuthorizeStore();

const personInfo = computed(() => toUserInfoText(authorize.user!.personInfo));
const hasAuthorized = computed(() => authorize.user !== null);

function toUserInfoText(personInfo: PersonInfo) {
    const { name, surname, patronymic } = personInfo;

    return [
        `${name.at(0)}.`,
        patronymic && `${patronymic.at(0)}.`,
        surname
    ].filter(inc => inc).join(' ');
}

</script>
<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

.user {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $gray-700;
    background-color: $gray-300;
}
</style>