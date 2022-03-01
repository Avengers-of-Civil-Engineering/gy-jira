import { useProjectIdInUrl } from "screens/kanban/utils";

// epics 的查询参数
export const useEpicsSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});
