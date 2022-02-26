import styled from "@emotion/styled";
import { Button, Drawer, Input } from "antd";
import { Form } from "antd";
import { UserSelect } from "components/user-select";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <Container>
        <h1>ProjectModal</h1>
        <Form layout={"vertical"} style={{ width: "40rem" }}>
          <Form.Item
            label={"名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input type={"text"} placeholder={"请输入项目名称"} />
          </Form.Item>
          <Form.Item
            label={"部门"}
            name={"organization"}
            rules={[{ required: true, message: "请输入部门名" }]}
          >
            <Input type={"text"} placeholder={"请输入部门名"} />
          </Form.Item>
          <Form.Item label={"负责人"} name={"personId"}>
            <UserSelect defaultOptionName={"负责人"} />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type={"primary"} htmlType={"submit"}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
