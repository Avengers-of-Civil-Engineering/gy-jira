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
