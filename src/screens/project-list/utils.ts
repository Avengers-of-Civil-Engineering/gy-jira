import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

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

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: "" });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
