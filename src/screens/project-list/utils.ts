import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

// 项目列表搜索参数： 项目名 name 和 负责人 personId
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

// 处理新建/编辑项目的逻辑
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const setSearchParams = useSetUrlSearchParam();

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setSearchParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
