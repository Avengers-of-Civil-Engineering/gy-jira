/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的 id
 * @param type 'before' | 'after'
 * @param referenceId 目标 id
 * @param list 要排序的列表, 比如 tasks, kanbans
 * @returns 排序后到数组
 */
export const reorder = ({
  fromId,
  referenceId,
  type,
  list,
}: {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  list: { id: number }[];
}) => {
  // console.log('toReorder-list', list)
  const copyList = [...list];
  const movingItemIndex = copyList.findIndex((item) => item.id === fromId);

  // 移动到空看板时会出现 destination = null
  if (!referenceId) {
    return insertAfter([...copyList], movingItemIndex, copyList.length - 1);
  }
  const targetIndex = copyList.findIndex((item) => item.id === referenceId);
  const insert = type === "before" ? insertBefore : insertAfter;
  return insert([...copyList], movingItemIndex, targetIndex);
};

/**
 * 将 list 中 from 位置的数据移动到 to 位置之前
 * @param list 原数组
 * @param from 起始位置的 index
 * @param to 目标位置的 index
 */
const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

/**
 * 将 list 中 from 位置的数据移动到 to 位置之后
 * @param list 原数组
 * @param from 起始位置的 index
 * @param to 目标位置的 index
 */
const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};
