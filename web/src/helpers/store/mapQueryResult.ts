import { Store } from "pinia";
import { QueryState, QueryActions } from "./queryStoreFactory";

export default function<T> (queryStore: Store<string , QueryState<T> , {} , QueryActions<T>>) {
    return queryStore.$state;
}