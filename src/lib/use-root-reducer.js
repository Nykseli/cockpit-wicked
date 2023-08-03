/**
* Based on https://github.com/ahungrynoob/use-root-reducer
* MIT-licenced code TODO: make sure this is ok
*/

import { useCallback } from "react";

export default function useRootReducer(reducerMap) {
    if (!reducerMap) {
        throw new Error("useRootReducer: please pass useReducers argv");
    }
    const rootStateKeys = Object.keys(reducerMap);
    const rootState = rootStateKeys.reduce(
        (lastState, key) => ({
            ...lastState,
            [key]: reducerMap[key][0]
        }),
        {}
    );

    const useRootReducerDispatch = useCallback(action => {
        rootStateKeys.forEach(key => {
            const fn = reducerMap[key][1];
            fn(action);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, rootStateKeys);

    return [rootState, useRootReducerDispatch];
}
