import { useQuery } from "@/helpers/store";
import { User } from "@/types/authorize.res.types";
import { Pagination } from "@/types/response/pagination.res.types";
import { defineStore } from "pinia";

export const useUserStore = defineStore('users' , () => {
    const usersQuery = useQuery<Pagination<User>>('usersQuery');

    async function loadUsersAsync(params : {skip:number , top: number}) {
        await usersQuery.get('/users' , { params });
    }

    return {
        user: usersQuery,
        loadUsersAsync
    }
});