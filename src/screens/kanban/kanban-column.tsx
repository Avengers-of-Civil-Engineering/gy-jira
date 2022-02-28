import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { Row } from "components/lib";
import { Kanban } from "types/kanban";
import { useDeleteKanban } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateTask } from "./create-task";
import { useTasksSearchParams } from "./utils";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  console.log("tasks", tasks);

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <p>{task.name}</p>
            <img
              src={task?.typeId === 1 ? "/task.svg" : "/bug.svg"}
              alt={"task-icon"}
            />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban();

  const deleteKanban = async () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item key={"delete"}>
        <Button type={"link"} onClick={deleteKanban}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  display: flex;
  flex-direction: column;
  background-color: rgb(244, 245, 247);
  border-radius: 6px;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  flex: 1;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
