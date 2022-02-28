import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { TaskModal } from "./task-modal";
import { TaskSearchPanel } from "./task-search-panel";
import { useProjectInUrl } from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading } = useKanbans();

  return (
    <ScreenContainer>
      <h1>{`${currentProject?.name}看板`}</h1>
      <TaskSearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: scroll;
`;
