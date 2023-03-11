<template>
    <Modal ref="modalRef">
        <ModifyInsertModal />
    </Modal>
    <article class="people_list">
        <header class="people_list__head">
            <section class="head_manager">
                <div class="btn_group">
                    <button class="btn btn-inline-primary" @click="clickInsertHandler">
                        <MaterialIcon size="md" type="outlined" icon="add" />
                    </button>
                    <button class="btn btn-inline-info" disabled>
                        <MaterialIcon size="md" type="outlined" icon="edit" />
                    </button>
                    <button class="btn btn-inline-danger" disabled>
                        <MaterialIcon size="md" type="outlined" icon="delete" />
                    </button>
                </div>
            </section>
        </header>
        <div class="card h-100 overflow-hidden">
            <section class="people_list__content">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Отчество</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in people" :key="person.index">
                            <td scope="row">{{ person.index }}</td>
                            <td>{{ person.name }}</td>
                            <td>{{ person.surname }}</td>
                            <td>{{ person.patronymic }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <footer class="people_list__footer">
                <Pagination />
            </footer>
        </div>
    </article>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePeopleStore } from '@/store/people.store';

import MaterialIcon from '@/assert/icons/MaterialIcon.vue';
import Modal from '@/assert/modal/Modal.vue';

import Pagination from '@/components/Pagination.vue';
import ModifyInsertModal from './modals/modifyInsert/ModifyInsertModal.vue';

const modalRef = ref<typeof Modal>();

const peopleStore = usePeopleStore();
const { people } = storeToRefs(peopleStore);

function clickInsertHandler() {
    modalRef.value && modalRef.value.open();
}

</script>

<style scoped lang="sass">
@mixin borderRight() {
    tr > *:not(:last-of-type) {
        border-right: solid 1px transparentize($gray-800, .9);
    }
}
.people_list {
    display: flex;
    flex-flow: column;
    height: 100%;

    $bg-header: $blue-200;

    .people_list__head {
        display: flex;

        .head_manager {
            display: flex;
            margin-left: auto;

            .btn_group {
                display: flex;
                gap:.5rem;
            }
        }
    }

    .people_list__content {
        height: 100%;
        .table {
            border-radius: inherit;
            thead  {
                color: $gray-600;


                tr > * {
                    border-bottom: solid 1px $blue-300;
                }

                @include borderRight;
            }

            tbody {
                color: $gray-700;

                tr:nth-of-type(odd) > * {
                    background-color: lighten($gray-200, 3);
                }
                
                tr > * {
                    border-bottom-style: none;
                }

                @include borderRight;
            }
        }
    }

    .people_list__footer {
        border-top:solid 1px $border-color;
        display: flex;
        justify-content: start;
        padding: .6rem 1rem;
        align-items: center;
    }
}
</style>