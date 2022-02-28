import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/project";
import { useDebounce } from "utils";
import { deleter, get, patch, post } from "./request";

// 根据参数 params 获取‘项目列表’
export const useProjects = (params?: Partial<Project>) => {
  const debouncedParam = { ...params, name: useDebounce(params?.name, 200) };

  return useQuery<Project[], Error>(["projects", debouncedParam], () =>
    get("/api/v1/projects/", debouncedParam)
  );
};

// 根据 projectId 获取‘单个项目’
export const useProject = (id: number) => {
  return useQuery<Project, Error>(
    ["projects", { id }],
    () => get(`/api/v1/projects/${id}/`),
    {
      enabled: !!id, // id 不为 0 时才发送请求。
    }
  );
};

// 创建单个项目
export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<Project>) => post("/api/v1/projects/", data),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 编辑单个项目
export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<Project>) => patch(`/api/v1/projects/${data.id}`, data),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 编辑单个项目的‘收藏状态’
export const useProjectPin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (pinData: Partial<Project>) =>
      post(`/api/v1/projects/${pinData.id}/toggle-pin/`, {
        newVal: pinData?.pin,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 删除单个项目
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) => deleter(`/api/v1/projects/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
