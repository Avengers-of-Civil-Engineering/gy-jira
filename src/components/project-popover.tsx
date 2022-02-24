import { Divider, Popover, Typography } from "antd";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const content = (
    <div>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <Divider />
      <ButtonNoPadding type={"link"}>创建项目</ButtonNoPadding>
    </div>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};
