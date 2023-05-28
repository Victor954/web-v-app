import * as components from '.';

export declare type AssertComponents = {
    [K in keyof typeof components]: typeof components[K]
}