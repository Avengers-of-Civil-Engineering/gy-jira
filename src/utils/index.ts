import { useEffect, useRef, useState } from "react";

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "" || value === 0;

// 清除搜索参数的无效值
export const cleanObject = (obj: { [key: string]: unknown }) => {
  if (!obj) {
    return null;
  }
  const copy = { ...obj };
  Object.keys(copy).forEach((key) => {
    const value = copy[key];
    if (isVoid(value)) {
      delete copy[key];
    }
  });
  return copy;
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [delay, value]);

  return debounceValue;
};

// 组件挂载状态
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

// export const subset = <
//   O extends { [key in K]: unknown },
//   K extends keyof O
// >(obj: O, keys: K[]) => {
//   const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K))
//   return Object.fromEntries(filteredEntries) as Pick<O, K>
// }

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
