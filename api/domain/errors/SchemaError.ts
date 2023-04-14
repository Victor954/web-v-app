import ServerError from "./ServerError";

export default class SchemaError extends ServerError {
    constructor(message: string) {
        super({
            message: message,
            code: 'schema_valid_error',
            statusCode: 400
        })
    }
}