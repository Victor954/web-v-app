export type PaginationReqDTO = Partial<{
    limit: string,
    offset: string
}>

export type RulesReqDTO = Partial<{
    exc: string[],
    eq: string
}>
