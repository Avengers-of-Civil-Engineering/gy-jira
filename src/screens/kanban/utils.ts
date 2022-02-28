import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
import { useUrlQueryParam } from "utils/url";

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
export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "processorId", "typeId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      name: param?.name,
      processorId: Number(param?.processorId) || undefined,
      typeId: Number(param?.typeId) || undefined,
      tagId: Number(param?.tagId) || undefined,
    }),
    [param, projectId]
  );
};

// 处理 编辑task 的逻辑
export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => setEditingTaskId({ editingTaskId: id }),
    [setEditingTaskId]
  );
  const close = useCallback(
    () => setEditingTaskId({ editingTaskId: "" }),
    [setEditingTaskId]
  );

  return {
    editingTaskId,
    startEdit,
    close,
    editingTask,
    isLoading,
  };
};
