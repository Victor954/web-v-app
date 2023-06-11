import { PersonInfoResDTO } from "./response/user.types"

export type TokenClaimsDTO = {
    login: string , 
    personInfo?: PersonInfoResDTO,
    roles?: string[]
}

export type ErrorResponse = {
    code: string;
    message: string;
}