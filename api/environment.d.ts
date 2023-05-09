/* eslint-disable no-var */
declare global {

    var __MONGO_URI__: string;

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
        login: string;
        roles?: string[];
      }
    }

    namespace jest {
      interface Matchers<R> {
        toBeValidTokens(toBeLogin: string): R;
      }
    }
}

export {};