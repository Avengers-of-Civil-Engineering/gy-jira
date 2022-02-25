import { Button } from "antd";
import { Row, ScreenContainer } from "components/lib";
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

  const { data: list, isLoading } = useProjects(param);
  const { data: users } = useUsers();
  // console.log('users', users)
  // console.log('projects', list)

  return (
    <ScreenContainer>
      <Row between={true} marginBottom={2}>
        <h1>项目列表</h1>
        <Button type={"link"} onClick={open}>
          创建项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};
