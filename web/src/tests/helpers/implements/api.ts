import { api } from '@/api';
import MockAdapter from "axios-mock-adapter";

export function impMockAdapter() {
    const mock = new MockAdapter(api);

    afterEach(() => {
        mock.reset();
    });

    return mock;
}