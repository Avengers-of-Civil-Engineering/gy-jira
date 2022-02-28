import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./utils";

export const TaskSearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      name: undefined,
      processorId: undefined,
      typeId: undefined,
      tagId: undefined,
    });
  };

  return (
    <Row gap={true} marginBottom={4}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams?.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams?.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
