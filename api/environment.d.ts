import { Express } from 'express';

declare global {

    var __MONGO_URI__: string;
    var app: Express;

    namespace NodeJS {
      interface ProcessEnv {
        ACCESS_SECRET_KEY: string;
        REFRESH_SECRET_KEY: string;
        MONGO_URL: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
      }
    }

    namespace Express {
      interface User {
        roles?: string[]
      }
    }

    namespace jest {
      interface Matchers<R> {
        toBeValidTokens(toBeLogin: string): R;
      }
    }
}

export {}