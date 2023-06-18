
import { PojosMetadataMap } from "@automapper/pojos";
import { FormModel } from "@/routes/home/components/users/types";
import { UserRolesResDTO } from "ts-domain-types/response/user.types";
import { RoleResDTO } from "ts-domain-types/response/role.type";
import { Mapper, createMap, forMember, mapFrom , nullSubstitution } from "@automapper/core";
import { toRaw } from "vue";

export function createUserMetadata() {
    PojosMetadataMap.create<FormModel>('UserFrom', {
        login: String,
        name: String,
        password: String,
        patronymic: String,
        surname: String,
        roles: Array<RoleResDTO>,
    });

    PojosMetadataMap.create<UserRolesResDTO>('UserResDto', {
        login: String,
        password: String,
        personInfo: Object,
        roles: Array<RoleResDTO>
    });
}

export function createUserMap(mapper: Mapper) {
    createMap<UserRolesResDTO, FormModel>(
        mapper,
        'UserResDto',
        'UserFrom',
        forMember(
            (destination) => destination.name,
            mapFrom((source) => source.personInfo?.name || ''),
        ),
        forMember(
            (destination) => destination.surname,
            mapFrom((source) => source.personInfo?.surname || ''),
        ),
        forMember(
            (destination) => destination.patronymic,
            mapFrom((source) => source.personInfo?.patronymic || ''),
        ),
        forMember(
            (destination) => destination.login,
            nullSubstitution('')
        ),
        forMember(
            (destination) => destination.password,
            nullSubstitution('')
        ),
        forMember(
            (destination) => destination.roles,
            mapFrom((source) => toRaw(source.roles) || []),
        )
    );
}