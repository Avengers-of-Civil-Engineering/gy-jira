import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/project";
import { useDebounce } from "utils";
import { get, patch } from "./request";

export const useProjects = (params?: Partial<Project>) => {
  const debouncedParam = { ...params, name: useDebounce(params?.name, 200) };

  return useQuery<Project[], Error>(["projects", debouncedParam], () =>
    get("/api/v1/projects/", debouncedParam)
  );
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<Project>) => patch(`/api/v1/projects/${data.id}`, data),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
