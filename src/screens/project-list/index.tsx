import { Button } from "antd";
import { ErrorBox, Row, ScreenContainer } from "components/lib";
import { Profiler } from "components/profiler";
import { useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjectModal, useProjectSearchParams } from "./utils";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();

  const [param, setParam] = useProjectSearchParams();

  const { data: list, isLoading, error } = useProjects(param);
  const { data: users } = useUsers();

  return (
    <Profiler id={"项目列表"}>
      <ScreenContainer>
        <Row between={true} marginBottom={2}>
          <h1>项目列表</h1>
          <Button type={"link"} onClick={open}>
            创建项目
          </Button>
        </Row>
        <SearchPanel param={param} setParam={setParam} />
        {error ? <ErrorBox error={error} /> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
      </ScreenContainer>
    </Profiler>
  );
};
