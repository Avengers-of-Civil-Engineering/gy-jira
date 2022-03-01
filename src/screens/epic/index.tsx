import styled from "@emotion/styled";
import { Button, Dropdown, List, Menu, Modal, Spin } from "antd";
import { ButtonNoPadding, Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/utils";
import { Epic } from "types/epic";
import { useDocumentTitle } from "utils";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { EpicModal } from "./epic-modal";
import { useEpicModal, useEpicsQueryKey, useEpicsSearchParams } from "./utils";

export const EpicScreen = () => {
  useDocumentTitle("任务组列表");

  const { open } = useEpicModal();

  const { data: currentProject } = useProjectInUrl();
  const { data: epics, isLoading: epicLoading } = useEpics(
    useEpicsSearchParams()
  );
  const { data: tasks, isLoading: taskLoading } = useTasks({
    projectId: currentProject?.id,
  });

  const isLoading = epicLoading || taskLoading;

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{`${currentProject?.name}任务组`}</h1>
        <Button onClick={open}>创建任务组</Button>
      </Row>
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <List
          style={{ overflow: "scroll" }}
          dataSource={epics}
          itemLayout={"vertical"}
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <h3>{epic.name}</h3>
                    <More epic={epic} />
                  </Row>
                }
                description={
                  <div>
                    <div>
                      开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              />
              <TasksContainer>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <Link
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      key={task.id}
                    >
                      {task.name}
                    </Link>
                  ))}
              </TasksContainer>
            </List.Item>
          )}
        />
      )}
      <EpicModal />
    </ScreenContainer>
  );
};

const More = ({ epic }: { epic: Epic }) => {
  const { startEdit } = useEpicModal();

  const { mutateAsync: deleteEpic, isLoading: deleteLoading } = useDeleteEpic(
    useEpicsQueryKey()
  );

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除任务组${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        await deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNoPadding type={"link"} onClick={() => startEdit(epic.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <ButtonNoPadding
              loading={deleteLoading}
              type={"link"}
              onClick={() => confirmDeleteEpic(epic)}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
