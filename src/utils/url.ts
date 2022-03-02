import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";

// 获取 url 的查询参数 searchParams
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(
          Object.fromEntries(searchParams) as { [key in K]: string },
          stateKeys
        ),
      [stateKeys, searchParams]
    ),
    (param: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(param);
    },
  ] as const;
};

// 格式化修改 url 查询参数的 set 函数
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (param: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...param,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
