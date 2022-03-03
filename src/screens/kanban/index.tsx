import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { TaskModal } from "./task-modal";
import { TaskSearchPanel } from "./task-search-panel";
import {
  useKanbanQueryKey,
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksQuerykey,
  useTasksSearchParams,
} from "./utils";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { useCallback } from "react";
import { useReorderTask, useTasks } from "utils/task";
import { Profiler } from "components/profiler";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbansSearchParams()
  );

  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanLoading || taskLoading;

  const dragEnd = useDragEnd();
  return (
    <Profiler id={"看板列表"}>
      <DragDropContext
        onDragEnd={
          // (...params) => { console.log('drag-drop', params) }
          dragEnd
        }
      >
        <ScreenContainer>
          <h1>{`${currentProject?.name}看板`}</h1>
          <TaskSearchPanel />
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <ColumnsContainer>
              <Drop
                droppableId={"kanban"}
                type={"COLUMN"}
                direction={"horizontal"}
              >
                <DropChild style={{ display: "flex" }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag
                      draggableId={"kanban" + kanban.id}
                      index={index}
                      key={kanban.id}
                    >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumnsContainer>
          )}
          <TaskModal />
        </ScreenContainer>
      </DragDropContext>
    </Profiler>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());

  const { data: allTasks } = useTasks(useTasksSearchParams());
  const { mutate: reorderTask } = useReorderTask(useTasksQuerykey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const referenceId = kanbans?.[destination.index].id;
        if (!fromId || !referenceId || fromId === referenceId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId, type });
      }

      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromId = allTasks?.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index]?.id;
        const referenceId = allTasks?.filter(
          (task) => task.kanbanId === toKanbanId
        )[destination.index]?.id;
        if (fromId === referenceId) {
          return;
        }
        const type =
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before";
        reorderTask({ fromId, referenceId, type, fromKanbanId, toKanbanId });
      }
    },
    [allTasks, kanbans, reorderKanban, reorderTask]
  );
};

const ColumnsContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: scroll;
`;
