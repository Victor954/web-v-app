import { Person } from "@/domain/person.types";
import { defineStore } from "pinia";

type State = {
    people: Person[];
}

type Actions = {
    fetchPeople: () => void
}

export const usePeopleStore = defineStore<'test', State , {} , Actions>('test' , {
    state: () => ({
        people: []
    }),
    actions: {
        fetchPeople() {
            this.people = [
                {
                    id: 1,
                    index: 1,
                    name: 'Name',
                    surname: 'S',
                    patronymic: 'Ptr'
                },
                {
                    id: 1,
                    index: 2,
                    name: 'Name',
                    surname: 'S',
                    patronymic: 'Ptr'
                },
                {
                    id: 1,
                    index: 3,
                    name: 'Name',
                    surname: 'S',
                    patronymic: 'Ptr'
                }
            ];
        }
    }
});