declare global {
    namespace jest {
      interface Matchers<R> {
        toBeValidTokens(toBeLogin: string): R;
      }
    }
}

export {}