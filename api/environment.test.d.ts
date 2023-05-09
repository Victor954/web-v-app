/* eslint-disable no-var */
import { Express } from 'express';

declare global {
  var app: Express;

    namespace jest {
      interface Matchers<R> {
        toBeValidTokens(toBeLogin: string): R;
      }
    }
    
}

export {};