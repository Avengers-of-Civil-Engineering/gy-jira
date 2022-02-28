import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "types/task";
import { useDebounce } from "utils";
import { deleter, get, post } from "./request";

// 根据参数 params 获取‘任务列表’
export const useTasks = (params?: Partial<Task>) => {
  const debouncedParam = { ...params, name: useDebounce(params?.name, 200) };

  return useQuery<Task[], Error>(["tasks", debouncedParam], () =>
    get("/api/v1/tasks/", debouncedParam)
  );
};

// 创建单个 task
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation((data: Partial<Task>) => post("/api/v1/tasks/", data), {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
};

// 删除单个任务
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) => deleter(`/api/v1/tasks/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
};
