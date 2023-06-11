<template>
    <select class="form-select" aria-label="Default select example" @change="selectHandler" v-model="selectedCode">
        <option v-for="role in roles" :value="role.code">{{ role.name }}</option>
    </select>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw, watch, watchEffect } from 'vue';

import { useRolesStore } from '@/store/roleStore';
import { RolesSelectRef } from './types';

type Props = {
    except?: string[]
}

const roleStore = useRolesStore();
const emit = defineEmits(['selectRole']);

const props = withDefaults(defineProps<Props>(), {
    except: () => []
});

const selectedCode = ref<string>();

const roles = computed(() => roleStore.roles.data);
const selected = computed(() => roles?.value?.find(({ code }) => code === selectedCode.value));

watch(() => props.except, (exceptRoles) => {

    const hasEveryExceptRoles = roles.value &&
        roles.value.length > 0 &&
        exceptRoles.length > 0 &&
        exceptRoles.some((code) => roles.value!.some(role => role.code === code));

    if (hasEveryExceptRoles) {
        roleStore.removeRoles(exceptRoles);
    } else {
        roleStore.loadRolesAsync({ code: { exc: toRaw(exceptRoles) } });
    }

});

watchEffect(() => {
    const firstCode = roles.value?.at(0)?.code;

    if (firstCode) {
        selectedCode.value = firstCode;
    }
});

onMounted(async () => {
    await roleStore.loadRolesAsync({ code: { exc: props.except } });
});

function selectHandler(event: Event) {

    if (event.target instanceof HTMLSelectElement) {
        emit('selectRole', selected);
    }
}

defineExpose<RolesSelectRef>({
    getSelected: () => toRaw(selected.value)
});
</script>