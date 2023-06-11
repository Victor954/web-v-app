import { RoleModel } from "@/types/request/role.req.types"

export type RolesSelectRef = {
    getSelected: () => RoleModel | undefined
}