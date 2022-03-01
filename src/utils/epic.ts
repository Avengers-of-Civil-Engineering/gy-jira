import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Epic } from "types/epic";
import { useDeleteConfig, useEditConfig } from "./optimistic-options";
import { deleter, get, patch, post } from "./request";

// 根据参数 params 获取‘epics 列表’
export const useEpics = (params?: Partial<Epic>) => {
  return useQuery<Epic[], Error>(["epics", params], () =>
    get("/api/v1/epics/", params)
  );
};

// 根据 epicId 获取‘单个 epic’
export const useEpic = (id: number) => {
  return useQuery<Epic, Error>(
    ["epics", { id }],
    () => get(`/api/v1/epics/${id}/`),
    {
      enabled: !!id, // id 不为 0 时才发送请求。
    }
  );
};

// 创建单个 epic
export const useAddEpic = () => {
  const queryClient = useQueryClient();

  return useMutation((data: Partial<Epic>) => post("/api/v1/epics/", data), {
    onSuccess: () => queryClient.invalidateQueries("epics"),
  });
};

// 删除单个 epic
export const useDeleteEpic = (queryKey: QueryKey) => {
  return useMutation(
    ({ id }: { id: number }) => deleter(`/api/v1/epics/${id}`),
    useDeleteConfig(queryKey)
  );
};

// 编辑单个 epic
export const useEditEpic = (queryKey: QueryKey) => {
  return useMutation(
    (data: Partial<Epic>) => patch(`/api/v1/epics/${data.id}`, data),
    useEditConfig(queryKey)
  );
};
