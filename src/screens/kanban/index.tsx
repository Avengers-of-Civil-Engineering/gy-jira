import { useProjectIdInUrl } from "./utils";

export const KanbanScreen = () => {
  const projectId = useProjectIdInUrl();

  return <div>{projectId}</div>;
};
