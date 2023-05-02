import { AxiosError } from "axios";

export type LoadState = 'initialized' | 'pending' | 'rejected' | 'fulfilled';
export type LoadError = AxiosError | Error | null;