<template>
    <slot name="authorized" v-if="isSuccess && userResponse.data"></slot>
    <slot name="unauthorized" v-if="isSuccess && !userResponse.data"></slot>
    <slot name="loading" v-if="!isSuccess"></slot>
</template>
<script lang="ts" setup>
import { onMounted, provide, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthorizeStore } from '@/store/authorize.store';
import { Identity } from './types';

const authorizeStore = useAuthorizeStore();
const { userResponse } = storeToRefs(authorizeStore);
const { fetchAuthorize } = authorizeStore;

const isSuccess = computed(() => userResponse.value.fetching === 'success')

onMounted(() => {
    fetchAuthorize();
})

provide<Identity>('identity', {
    user: userResponse.value.data
})

</script>