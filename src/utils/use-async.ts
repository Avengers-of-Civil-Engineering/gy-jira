import { useCallback, useReducer } from "react";
import { useMountedRef } from "utils";

interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const useSafeDispatch = <S>(dispatch: (...args: S[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: S[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    { ...defaultInitialState, ...initialState }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: T) => {
      safeDispatch({
        data,
        error: null,
        status: "success",
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        error,
        status: "error",
      });
    },
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型的数据");
      }
      safeDispatch({ status: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return Promise.reject(error);
        });
    },
    [safeDispatch, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    ...state,
    setData,
    setError,
    run,
  };
};
