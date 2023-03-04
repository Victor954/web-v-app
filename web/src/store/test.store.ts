import { defineStore } from "pinia";

export const useTestStore = defineStore('test' , {
    state: () => ({
        name: 'Name'
    }),
    actions: {
        setName(value: string) {
            this.name = value;
        }
    }
});