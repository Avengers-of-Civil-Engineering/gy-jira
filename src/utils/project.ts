import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/project";
import { get, patch } from "./request";

export const useProjects = (params?: Partial<Project>) => {
  return useQuery<Project[], Error>(["projects", params], () =>
    get("/api/v1/projects/", params)
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
