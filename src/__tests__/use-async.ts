import { useAsync } from "utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsync> = {
  status: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,

  setData: expect.any(Function),
  setError: expect.any(Function),
  run: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  status: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  status: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync 可以处理异步请求", async () => {
  let resolve: any;
  // let reject: any
  const promise = new Promise((res, rej) => {
    resolve = res;
    // reject = rej
  });

  // renderHook: 用于渲染 Hook
  // 语法：function renderHook(callback: (props?: any) => any, options?: RenderHookOptions): RenderHookResult
  // renderHook 返回值 result: { all: Array<any>, current: any, error: Error }
  const { result } = renderHook(() => useAsync());
  // current 反映传入 renderHook 中的任何 Hook return 的最新值。
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);

  const resolvedValue = { mockValue: "resolved" };
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({ ...successState, data: resolvedValue });
});
