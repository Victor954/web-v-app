import { useQuery } from "@/helpers/store";
import { RoleResDTO } from "ts-domain-types/response/role.type";
import { RolesReqDTO } from "ts-domain-types/request/role.types";
import { defineStore } from "pinia";

export const useRolesStore = defineStore('roles' , () => {
    const rolesQuery = useQuery<RoleResDTO[]>('rolesQuery');

    async function loadRolesAsync(params : RolesReqDTO) {
        await rolesQuery.get('/roles' , { params });
    }

    function removeRoles(roleCodes: string[]) {
        rolesQuery.data = rolesQuery.data?.filter(({ code }) => !roleCodes.includes(code));
    }

    return {
        roles: rolesQuery,
        loadRolesAsync,
        removeRoles
    }
});