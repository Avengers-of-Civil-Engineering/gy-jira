import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";
import { useDeleteConfig, useReorderKanbanConfig } from "./optimistic-options";
import { deleter, get, post } from "./request";

// 根据参数 params 获取‘看板列表’
export const useKanbans = (params?: Partial<Kanban>) => {
  return useQuery<Kanban[], Error>(["kanbans", params], () =>
    get("/api/v1/kanbans/", params)
  );
};

// 创建单个看板
export const useAddKanban = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<Kanban>) => post("/api/v1/kanbans/", data),
    // useAddConfig(queryKey)
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
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

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

// reorder 看板
export const useReorderKanban = (queryKey: QueryKey) => {
  return useMutation(
    (data: Partial<SortProps>) => post("/api/v1/kanbans/reorder/", data),
    useReorderKanbanConfig(queryKey)
  );
};
