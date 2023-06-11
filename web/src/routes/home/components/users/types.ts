import { RoleResDTO } from 'ts-domain-types/response/role.type';

export type FormModel = {
    login: string,
    surname: string,
    name: string,
    patronymic: string,
    password: string,
    roles: RoleResDTO[]
}

export type RolesFormArgs = { value: RoleResDTO[], change: (value: RoleResDTO[]) => void }