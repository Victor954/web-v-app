<template>
    <PopoverContext>
        <template #popover>
            <article class="w-100 rounded roles">
                <Scrollbar style="height: 90px">
                    <div class="d-flex flex-wrap w-100 gap-2">
                        <Label v-if="rolesCount > 0" v-for="role in $props.roles" @delete="deleteHandler(role.code)"
                            has-remove>{{
                                role.name
                            }}
                        </Label>
                    </div>
                </Scrollbar>
                <hr class="my-1" />
                <div class="input-group role_input_group">
                    <RolesSelect class="p-1 height-inherit" :except="expectRoles" ref="rolesSelectRef" />
                    <Button type="button" style-type="secondary" outline class="height-inherit" @click="insertHandler">
                        <Icon icon="add" class="fs-5" />
                    </Button>
                </div>
            </article>
        </template>
        <template #content="{ show, attrs }">
            <Button type="button" style-type="secondary" class="px-2 h-100 d-flex" outline
                @click="$event => show($event.target)" v-bind="attrs">
                <Icon icon="edit" class="fs-5" />
            </Button>
        </template>
    </PopoverContext>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect, toRaw } from 'vue';
import RolesSelect from '@/components/forms/RolesSelect.vue';
import { RolesSelectRef } from '@/components/forms/types';
import { RoleResDTO } from 'ts-domain-types/response/role.type';

type Props = {
    roles: RoleResDTO[]
}

const props = defineProps<Props>();
const emit = defineEmits(['change']);

const expectRoles = ref<string[]>();
const rolesSelectRef = ref<RolesSelectRef>();


const rolesCount = computed(() => props.roles.length);

watchEffect(() => {
    expectRoles.value = props.roles.map(role => role.code);
});

function insertHandler() {
    const selected = rolesSelectRef.value?.getSelected();

    if (selected) {
        const { _id, ...roleInfo } = selected;

        emit('change', [...toRaw(props.roles), roleInfo]);
    }
}

function deleteHandler(roleCode: string) {
    const excRoles = props.roles.filter(({ code }) => code !== roleCode);
    emit('change', excRoles);
}
</script>
<style scoped lang="scss">
.roles {
    .role_input_group {
        height: 34px;
    }
}
</style>