import styled from "@emotion/styled";
import { Button, List, Spin } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/utils";
import { useDocumentTitle } from "utils";
import { useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { useEpicsSearchParams } from "./utils";

export const EpicScreen = () => {
  useDocumentTitle("任务组列表");

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
        <Button>创建任务组</Button>
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
                    <Button type={"link"}>删除</Button>
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
    </ScreenContainer>
  );
};

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
