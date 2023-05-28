<template>
    <section class="container">
        <div class="row">
            <PageTitle label="Пользователи"></PageTitle>
            <DataGrid :rows="rows" :columns="columns" :item-page-count="20" :total-count="totalCount"
                @load-data="loadDataHandler" @insert="insertHandler" @update="updateHandler" @delete="deleteHandler"
                :map-default-values="mapDefaultValues">
                <template #row="{ data, styles }">
                    <div class="td" :style="styles[0]">{{ data.id }}</div>
                    <div class="td" :style="styles[1]">{{ data.login }}</div>
                    <div class="td" :style="styles[2]">{{ data.personInfo.surname }}</div>
                    <div class="td" :style="styles[3]">{{ data.personInfo.name }}</div>
                    <div class="td" :style="styles[4]">{{ data.personInfo.patronymic || 'Нет' }}</div>
                    <div class="td" :style="styles[5]">
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
                        <Input name="roles" placeholder="Введите роли" class="p-1" />
                    </div>
                </template>
            </DataGrid>
        </div>
    </section>
</template>
<script setup lang="ts">
import { LoadDataEvent } from '@/assets/data_grid/types';
import rules from '@/assets/form/validation/rules';
import { useUserStore } from '@/store/userStore';
import _ from 'lodash';
import { computed } from 'vue';

const usersStore = useUserStore();

const columns = [
    { text: '№', width: '5%' },
    { text: 'Логин', width: '15%' },
    { text: 'Фамилия', width: '20%' },
    { text: 'Имя', width: '20%' },
    { text: 'Отчество', width: '20%' },
    { text: 'Роли', width: '20%' },
]

const totalCount = computed(() => usersStore.user.data?.totalCount || 0);
const rows = computed(() => usersStore.user.data?.entities.map((data, index) => ({ data, index })) || []);

type FormModel = {
    login: string,
    surname: string,
    name: string,
    patronymic: string,
    roles: string
}

function mapDefaultValues(rowData: Record<string, any> | null): FormModel {
    const fields: (keyof FormModel)[] = ['login', 'name', 'patronymic', 'roles', 'surname'];

    let defaultValues = fields.reduce<Partial<FormModel>>((current, next) => ({ ...current, [next]: '' }), {});

    if (rowData) {
        const { personInfo, roles, ...rest } = rowData;

        defaultValues = {
            ...rest,
            name: personInfo.name,
            patronymic: personInfo.patronymic || defaultValues.patronymic,
            surname: personInfo.surname,
            roles: roles || defaultValues.roles
        }
    }

    return defaultValues as FormModel;
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