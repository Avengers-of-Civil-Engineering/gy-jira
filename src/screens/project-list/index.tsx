import { Button } from "antd";
import { Row, ScreenContainer } from "components/lib";
import { useEffect, useState } from "react";
import { Project } from "types/project";
import { useDocumentTitle } from "utils";
import { projects, users } from "./db";
import { List } from "./list";
import { ProjectModal } from "./project-modal";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useState({
    name: "",
    personId: 0,
  });

  const [list, setList] = useState<Project[]>([]);

  const [projectModalOpen, setProjectModalOpen] = useState(false);

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
        <h2>项目列表</h2>
        <Button type={"link"} onClick={() => setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} dataSource={list || []} />
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </ScreenContainer>
  );
};
