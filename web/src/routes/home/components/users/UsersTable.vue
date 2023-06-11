<template>
    <DataGrid :rows="rows" :columns="columns" :item-page-count="20" :total-count="totalCount" @load-data="loadDataHandler"
        @insert="insertHandler" @update="updateHandler" @delete="deleteHandler" :map-default-values="mapDefaultValues">
        <template #row="{ data, styles }">
            <div class="td" :style="styles[0]">{{ data.id }}</div>
            <div class="td" :style="styles[1]">{{ data.login }}</div>
            <div class="td" :style="styles[2]">{{ data.personInfo.surname }}</div>
            <div class="td" :style="styles[3]">{{ data.personInfo.name }}</div>
            <div class="td" :style="styles[4]">{{ data.personInfo.patronymic || 'Нет' }}</div>
            <div class="td" :style="styles[5]">{{ data.password }}</div>
            <div class="td" :style="styles[6]">
                <Label v-for="role in data.roles">{{ role.name }}</Label>
            </div>
        </template>
        <template #form="{ styles, data }">
            <div class="td" :style="styles[0]">
                {{ data?.id }}
            </div>
            <div class="td align-items-start" :style="styles[1]">
                <Validate :rules="[rules.required, rules.alphanumeric, rules.length(3, 20)]" class="w-100">
                    <Input name="login" placeholder="Введите логин" class="p-1" />
                </Validate>
            </div>
            <div class="td align-items-start" :style="styles[2]">
                <Validate :rules="[rules.required]" class="w-100">
                    <Input name="surname" placeholder="Введите фамилию" class="p-1" />
                </Validate>
            </div>
            <div class="td align-items-start" :style="styles[3]">
                <Validate :rules="[rules.required]" class="w-100">
                    <Input name="name" placeholder="Введите имя" class="p-1" />
                </Validate>
            </div>
            <div class="td align-items-start" :style="styles[4]">
                <Input name="patronymic" placeholder="Введите отчество" class="p-1" />
            </div>
            <div class="td align-items-start" :style="styles[5]">
                <UserPassword />
            </div>
            <div class="td align-items-start" :style="styles[6]">
                <Controller name="roles">
                    <template #default="{ value, change }: RolesFormArgs">
                        <UserRoles :roles=" value " :onChange=" change " />
                    </template>
                </Controller>
            </div>
        </template>
    </DataGrid>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import _ from 'lodash';

import { modelMapper } from '@/helpers/profiles/userProfile';
import { useUserStore } from '@/store/userStore';
import rules from '@/assets/form/validation/rules';

import { LoadDataEvent } from '@/assets/data_grid/types';
import { UserRolesModel } from '@/types/response/authorize.res.types';
import { FormModel, RolesFormArgs } from './types';

import UserRoles from './UserRoles.vue';
import UserPassword from './UserPassword.vue';

const usersStore = useUserStore();

const columns = [
    { text: '№', width: '5%' },
    { text: 'Логин', width: '15%' },
    { text: 'Фамилия', width: '15%' },
    { text: 'Имя', width: '15%' },
    { text: 'Отчество', width: '15%' },
    { text: 'Пароль', width: '20%' },
    { text: 'Роли', width: '15%' },
]

const totalCount = computed(() => usersStore.user.data?.totalCount || 0);
const rows = computed(() => usersStore.user.data?.entities.map((data, index) => ({ data, index })) || []);

function mapDefaultValues(rowData: Record<string, any> | null): Record<string, any> {
    return modelMapper(rowData as UserRolesModel);
}

function loadDataHandler(loadData: LoadDataEvent) {
    usersStore.loadUsersAsync(loadData);
}

function insertHandler(formModel: FormModel) {
    console.log(formModel);
}

function updateHandler(formModel: FormModel) {
    console.log(formModel);
}

function deleteHandler(indexes: number[]) {
    console.log(indexes);
}

</script>