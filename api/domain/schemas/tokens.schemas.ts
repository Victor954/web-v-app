import Joi from "joi";
import { RefreshToken } from "../types/request/tokens.types";

export const tokensSchema = Joi.object<RefreshToken>({
    accessToken : Joi.string()
        .required(),

    refreshToken: Joi.string()
        .required(),

    login : Joi.string()
        .alphanum()
        .min(3)
        .max(150)
        .required(),
});