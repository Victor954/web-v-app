import { useQuery } from "@/helpers/store";
import { UserRolesResDTO } from 'ts-domain-types/response/user.types'
import { PaginationResDTO } from 'ts-domain-types/response/pagination.types'
import { defineStore } from "pinia";

export const useUserStore = defineStore('users' , () => {
    const usersQuery = useQuery<PaginationResDTO<UserRolesResDTO>>('usersQuery');

    async function loadUsersAsync(params : {offset:number , limit: number}) {
        await usersQuery.get('/users' , { params });
    }

    return {
        user: usersQuery,
        loadUsersAsync
    }
});