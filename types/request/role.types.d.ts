import { PaginationReqDTO , RulesReqDTO } from './common.types';

export type RolesReqDTO = Partial<{
    code: RulesReqDTO
}> & PaginationReqDTO