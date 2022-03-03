import styled from "@emotion/styled";
import { Button, Drawer, Input, Spin } from "antd";
import { Form } from "antd";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddProject, useEditProject, useProject } from "utils/project";
import {
  projectListActions,
  selectProjectModalEditId,
  selectProjectModalOpen,
} from "./project-list.slice";
import { useProjectsQueryKey } from "./utils";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  const editingProjectId = useSelector(selectProjectModalEditId);
  console.log("store-editingProjectId", editingProjectId);

  const { data: editingProject, isLoading } = useProject(editingProjectId);
  console.log("get-editingProject", editingProject);

  const useMutatePeoject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, isLoading: mutateLoading } = useMutatePeoject(
    useProjectsQueryKey()
  );

  const title = editingProject ? "编辑项目" : "创建项目";

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      // resetFields: 重置一组字段到 initialValues
      form.resetFields();
      dispatch(projectListActions.closeProjectModal());
    });
  };

  const closeModal = () => {
    form.resetFields();
    dispatch(projectListActions.closeProjectModal());
  };

  // 进入页面时，初始化表单内容
  useEffect(() => {
    console.log("look!");
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
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
              <Form.Item
                label={"负责人"}
                name={"personId"}
                rules={[{ required: true, message: "请选择负责人" }]}
              >
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
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
