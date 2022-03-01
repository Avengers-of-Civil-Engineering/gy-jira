import { useProjectIdInUrl } from "screens/kanban/utils";
import { useEpic } from "utils/epic";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

// epics 的查询参数
export const useEpicsSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useEpicsQueryKey = () => ["epics", useEpicsSearchParams()];

// 处理 创建/编辑 epic 的逻辑
export const useEpicModal = () => {
  const [{ createEpic }, setCreateEpic] = useUrlQueryParam(["createEpic"]);
  const [{ editingEpicId }, setEditingEpicId] = useUrlQueryParam([
    "editingEpicId",
  ]);

  const { data: editingEpic, isLoading } = useEpic(Number(editingEpicId));

  const setSearchParams = useSetUrlSearchParam();

  const open = () => setCreateEpic({ createEpic: true });
  const startEdit = (id: number) => setEditingEpicId({ editingEpicId: id });
  const close = () => setSearchParams({ createEpic: "", editingEpicId: "" });

  return {
    isEpicModalOpen: createEpic === "true" || Boolean(editingEpicId),
    open,
    startEdit,
    close,
    editingEpic,
    isLoading,
  };
};
