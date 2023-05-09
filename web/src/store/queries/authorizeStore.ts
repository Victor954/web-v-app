import { queryStoreFactory } from "@/helpers/store";
import { Tokens } from "@/types/authorize.res.types";

export const useFetchTokens = queryStoreFactory<Tokens>({
    name: 'queryTokens'
});
