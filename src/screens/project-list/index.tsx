import { Button } from "antd";
import { Row, ScreenContainer } from "components/lib";
import { useDispatch } from "react-redux";
import { useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { List } from "./list";
import { projectListActions } from "./project-list.slice";
import { SearchPanel } from "./search-panel";
import { useProjectSearchParams } from "./utils";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const dispatch = useDispatch();

  const [param, setParam] = useProjectSearchParams();

  const { data: list, isLoading } = useProjects(param);
  const { data: users } = useUsers();

  return (
    <ScreenContainer>
      <Row between={true} marginBottom={2}>
        <h1>项目列表</h1>
        <Button
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};
