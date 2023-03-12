export type FetchState = 'init' | 'fetching' | 'success' | 'error'

export type ResponseResult<T> = {
    data?: T,
    fetching: FetchState,
    error?: Error
}