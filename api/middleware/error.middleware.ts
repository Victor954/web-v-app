import { ErrorRequestHandler } from 'express'
import { isErrorParse } from '../domain/errors/ErrorParse';
import ServerError from '../domain/errors/ServerError';

const errorRequestHandler: ErrorRequestHandler = (err ,req , res , next) => {
    
    if(err instanceof ServerError && isErrorParse(err)) {
        return res.status(err.statusCode).json(err.toJSON()); 
    }

    if(isErrorParse(err)) {
        return res.status(400).json(err.toJSON()); 
    }

    if(err instanceof Error) {
        return res.status(500).json({ message: err.message , code: 'error' }); 
    }

    next(err);
}

export default errorRequestHandler;