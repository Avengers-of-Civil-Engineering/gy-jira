import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["username", "personId"]);

  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) }), [param]),
    setParam,
  ] as const;
};

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
