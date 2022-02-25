import { useQuery } from "react-query";
import { Project } from "types/project";
import { get } from "./request";

export const useProjects = (params: Partial<Project>) => {
  return useQuery<Project[], Error>(["projects", params], () =>
    get("/api/v1/projects/", params)
  );
};
