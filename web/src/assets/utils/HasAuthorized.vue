<template>
    <slot v-if="visible"></slot>
</template>
<script setup lang="ts">
import { useAuthorizeStore } from '@/store/authorizeStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const authorizeStore = useAuthorizeStore();
const { user } = storeToRefs(authorizeStore);

type Props = {
    roles?: string[]
}

const props = withDefaults(defineProps<Props>(), {});

const visible = computed(() => {

    const hasRolesAccess = !(props.roles && props.roles.length > 0) || props.roles.some(role => user.value?.roles?.includes(role));
    const hasAccess = !!user.value;

    return hasAccess && hasRolesAccess
});

</script>