import styled from "@emotion/styled";
import { Divider, Popover, Typography, List } from "antd";
import { projects } from "screens/project-list/db";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
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
      <ButtonNoPadding type={"link"} onClick={() => console.log("创建项目")}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
