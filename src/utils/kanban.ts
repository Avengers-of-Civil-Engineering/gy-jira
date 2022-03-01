import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";
import { useDeleteConfig } from "./optimistic-options";
import { deleter, get, post } from "./request";

// 根据参数 params 获取‘看板列表’
export const useKanbans = (params?: Partial<Kanban>) => {
  return useQuery<Kanban[], Error>(["kanbans", params], () =>
    get("/api/v1/kanbans/", params)
  );
};

// 创建单个看板
export const useAddKanban = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<Kanban>) => post("/api/v1/kanbans/", data),
    {
      onSuccess: () => queryClient.invalidateQueries("kanbans"),
    }
  );
};

// 删除单个看板
export const useDeleteKanban = (queryKey: QueryKey) => {
  return useMutation(
    ({ id }: { id: number }) => deleter(`/api/v1/kanbans/${id}`),
    useDeleteConfig(queryKey)
  );
};
