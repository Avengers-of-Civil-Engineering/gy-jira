import { Button } from "antd";
import { Row, ScreenContainer } from "components/lib";
import { useEffect, useState } from "react";
import { Project } from "types/project";
import { useDocumentTitle } from "utils";
import { projects, users } from "./db";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjectModal } from "./utils";

export const ProjectListScreen = () => {
  const { open } = useProjectModal();

  useDocumentTitle("项目列表", false);

  const [param, setParam] = useState({
    username: "",
    personId: 0,
  });

  const [list, setList] = useState<Project[]>([]);

  // TODO: 修改 -> 根据 params 请求后端 projects 数据，然后 setList
  useEffect(() => {
    const newList = projects.filter(
      (project) => project.personId === param.personId
    );
    if (!newList.length) {
      setList(projects);
    } else {
      setList(newList);
    }
  }, [param]);

  return (
    <ScreenContainer>
      <Row between={true} marginBottom={2}>
        <h1>项目列表</h1>
        <Button type={"link"} onClick={open}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} dataSource={list || []} />
    </ScreenContainer>
  );
};
