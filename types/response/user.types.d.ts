import { MongoRes } from "../mongo.types";
import { RoleResDTO } from "./role.type";

export type PersonInfoResDTO = {
    name: string;
    surname: string;
    patronymic?: string | null;
}

export type UserRolesResDTO = MongoRes<{
    login: string;
    password: string,
    personInfo: PersonInfoResDTO;
    roles: RoleResDTO[];
}>
