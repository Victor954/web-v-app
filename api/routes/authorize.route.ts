import { Router } from "express";
import * as authorizeService from '@/services/authorize.service';
import bodyValidate from "@/middleware/bodyValidate.middleware";
import { loginSchema, registerSchema } from "@/domain/schemas/authorize.schemas";

const router = Router();

router.post('/authorize/login' , bodyValidate(loginSchema) , async (req , res , next) => {
    try {
        const response = await authorizeService.loginAsync(req.body);
        res.json(response);
    }
    catch(error) {
        next(error);
    }
});

router.post('/authorize/register' , bodyValidate(registerSchema) , async (req , res , next) => {
    try {
        const response = await authorizeService.registerAsync(req.body);
        res.json(response);
    }
    catch(error) {
        next(error);
    }
});


export default router;