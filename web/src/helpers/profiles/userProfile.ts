import { FormModel } from "@/routes/home/components/users/types";
import { UserRolesResDTO } from "ts-domain-types/response/user.types";

export function modelMapper(src: UserRolesResDTO | null): FormModel {
    let formModel:FormModel = {
        login: '',
        name: '',
        patronymic: '',
        password: '',
        roles: [],
        surname: ''
    }

    if(src) {
        return {
            login: src.login,
            name: src.personInfo.name,
            patronymic: src.personInfo.patronymic || formModel.patronymic,
            surname: src.personInfo.surname,
            password: '',
            roles: src.roles || formModel.roles
        }
    }

    return formModel;
}