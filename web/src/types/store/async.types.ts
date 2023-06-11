import { AxiosError } from "axios";
import { ErrorResponse } from "ts-domain-types/server.types";

export type LoadState = 'initialized' | 'pending' | 'rejected' | 'fulfilled';
export type LoadError = AxiosError<ErrorResponse> | Error | null;