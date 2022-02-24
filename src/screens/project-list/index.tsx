import { ScreenContainer } from "components/lib";
import { useEffect, useState } from "react";
import { Project } from "types/project";
import { useDocumentTitle } from "utils";
import { projects, users } from "./db";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useState({
    name: "",
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
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} dataSource={list || []} />
    </ScreenContainer>
  );
};
