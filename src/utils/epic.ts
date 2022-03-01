import { useMutation, useQuery, useQueryClient } from "react-query";
import { Epic } from "types/epic";
import { deleter, get, post } from "./request";

// 根据参数 params 获取‘epics 列表’
export const useEpics = (params?: Partial<Epic>) => {
  return useQuery<Epic[], Error>(["epics", params], () =>
    get("/api/v1/epics/", params)
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
export const useDeleteEpic = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) => deleter(`/api/v1/epics/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("epics"),
    }
  );
};
