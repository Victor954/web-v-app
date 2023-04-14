import { ErrorParse } from "./ErrorParse";

type ServerErrorOptions = {
    message: string;
    statusCode?: number;
    code?: string;
}

export default class ServerError extends Error implements ErrorParse {

    statusCode: number = 500;
    code: string = 'server_error';

    constructor(options: ServerErrorOptions) {
        super(options.message);

        if(options.statusCode)
            this.statusCode = options.statusCode;

        if(options.code)
            this.code = options.code;  
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message
        }
    }
}