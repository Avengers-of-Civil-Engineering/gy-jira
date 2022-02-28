import { useLocation } from "react-router";
import { useProject } from "utils/project";

// 从 url 中获取 projectId
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const projectId = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(projectId);
};

// 根据 projectId 请求项目内容
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

// kanbans 的查询参数
export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

// tasks 的查询参数
export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });
