import AuthorizeError from '@/domain/errors/AuthorizeError';
import { db } from '@/mongo';
import { verifyAccessToken } from '@/services/tokens/verify.service';
import { Strategy } from 'passport-http-bearer';

const bearerStrategy = new Strategy(async (token , done) => {
    try {
        const { login } = verifyAccessToken(token);

        const user = await db.UserModel.findOne({login});

        if(!user) return done(null , false);

        done(null , user.toObject() , { scope: 'all' });
    }
    catch(error) {
        done(new AuthorizeError('unauthorize'));
    }
});

export default bearerStrategy;