import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "types/task";
import { useDebounce } from "utils";
import { useDeleteConfig, useEditConfig } from "./optimistic-options";
import { deleter, get, patch, post } from "./request";

// 根据参数 params 获取‘任务列表’
export const useTasks = (params?: Partial<Task>) => {
  const debouncedParam = { ...params, name: useDebounce(params?.name, 200) };

  return useQuery<Task[], Error>(["tasks", debouncedParam], () =>
    get("/api/v1/tasks/", debouncedParam)
  );
};

// 根据 taskId 获取‘单个task’
export const useTask = (id: number) => {
  return useQuery<Task, Error>(
    ["tasks", { id }],
    () => get(`/api/v1/tasks/${id}/`),
    {
      enabled: !!id, // id 不为 0 时才发送请求。
    }
  );
};

// 创建单个 task
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation((data: Partial<Task>) => post("/api/v1/tasks/", data), {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });
};

// 删除单个 task
export const useDeleteTask = (queryKey: QueryKey) => {
  return useMutation(
    ({ id }: { id: number }) => deleter(`/api/v1/tasks/${id}`),
    useDeleteConfig(queryKey)
  );
};

// 编辑单个 task
export const useEditTask = (queryKey: QueryKey) => {
  return useMutation(
    (data: Partial<Task>) => patch(`/api/v1/tasks/${data.id}`, data),
    useEditConfig(queryKey)
  );
};
