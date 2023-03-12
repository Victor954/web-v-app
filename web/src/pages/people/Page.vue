<template>
    <section class="people_manager page">
        <section class="people_manager__title">
            <Title icon="group" title="Список лиц"></Title>
        </section>
        <section class="people_manager__body">
            <div class="card border-light shadow-sm">
                <div class="card-body d-flex gap-5">
                    <section class="people-manager__filter">

                    </section>
                    <section class="people-manager__list">
                        <List></List>
                    </section>
                </div>
            </div>
        </section>
    </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import List from './List.vue';
import Title from '@/assert/pages/header/Title.vue';

import { usePeopleStore } from '@/store/people.store';

const { fetchPeople } = usePeopleStore();

onMounted(() => {
    fetchPeople();
});

</script>

<style scoped lang="sass">

    .people_manager {
        .people_manager__body {


            .people-manager__filter {
                width: 25%;
                margin: calc($card-spacer-x * -1 - 1px);
                background-color: lighten($gray-200, 3);
                border-top-left-radius: $card-border-radius;
                border-bottom-left-radius: $card-border-radius;
            }

            .people-manager__list {
                width: 75%;
            }
        }
    }
    .line {
        width: 1px;
        background-color: var(--bs-card-border-color);
    }
</style>