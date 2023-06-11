import { Request , Response , NextFunction} from 'express';

export type ReqQuery<TQuery> = Request<object, object, object, TQuery>

export type Res<TRes> = Response<TRes>;

export type NextFn = NextFunction;