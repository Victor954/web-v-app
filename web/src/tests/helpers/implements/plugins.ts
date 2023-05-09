import { Router } from "vue-router";
import { createPlugins } from "../plugins";

export function impPluginsAndMockRoute() {
    
    return () => {
        let plugins!:ReturnType<typeof createPlugins>;
        let push!:jest.SpyInstance<any, any[], any>;
        let router!: Router;

        beforeEach(() => {
            plugins = createPlugins();
            router = plugins[1];
            push = jest.spyOn(router, 'push');
        });

        afterEach(() => {
            push.mockClear();
        });

        return {
            plugins,
            push,
            router
        }
    }
}