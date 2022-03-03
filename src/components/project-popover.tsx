import styled from "@emotion/styled";
import { Divider, Popover, Typography, List } from "antd";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: projects, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {/* TODO: 完善 onClick 的逻辑 */}
      <ButtonNoPadding
        type={"link"}
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

export const ContentContainer = styled.div`
  min-width: 30rem;
`;
