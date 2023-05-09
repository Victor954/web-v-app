import { AxiosError } from "axios";
import { ErrorResponse } from "../response/error.res.types";

export type LoadState = 'initialized' | 'pending' | 'rejected' | 'fulfilled';
export type LoadError = AxiosError<ErrorResponse> | Error | null;