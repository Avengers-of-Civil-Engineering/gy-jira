import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

// 使用 react-query 实现乐观更新(Optimistic Updates)
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),

    // Mutation 一发生，onMutate 就被调用.
    onMutate: async (target: any) => {
      // 撤销相关的查询（这样它们就不会覆盖我们的乐观更新）
      await queryClient.cancelQueries(queryKey);
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },

    // Mutation 请求出错时，调用 onError 回滚
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousItems);
    },

    // 总是在错误或成功之后重新获取：
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]));

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    // 先根据 target 携带的 fromId 和 referenceId 对本次返回的 task数组 old 进行排序
    const orderedList = reorder({ list: old, ...target }) as Task[];

    // 然后，在排序后的数组内找到 fromId 对应的 task， 将其 kanbanId 改成 toKanbanId
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
