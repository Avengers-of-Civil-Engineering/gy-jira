import styled from "@emotion/styled";
import { Button, Drawer, Input, DatePicker, Spin } from "antd";
import { Form } from "antd";
import { useEffect } from "react";
import { useProjectIdInUrl } from "screens/kanban/utils";
import { useAddEpic, useEditEpic } from "utils/epic";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useEpicModal, useEpicsQueryKey } from "./utils";

export const EpicModal = () => {
  const { isEpicModalOpen, editingEpic, isLoading, close } = useEpicModal();
  const projectId = useProjectIdInUrl();

  const useMutateEpic = editingEpic ? useEditEpic : useAddEpic;
  const { mutateAsync, isLoading: mutateLoading } = useMutateEpic(
    useEpicsQueryKey()
  );

  const [form] = Form.useForm();

  const title = editingEpic ? "编辑任务组" : "创建任务组";

  const onFinish = async (values: any) => {
    mutateAsync({ ...editingEpic, projectId, ...values }).then(() => {
      // resetFields: 重置一组字段到 initialValues
      form.resetFields();
      close();
    });
  };

  const onClose = () => {
    form.resetFields();
    close();
  };

  // 进入页面时，初始化表单内容
  useEffect(() => {
    form.setFieldsValue({ name: editingEpic?.name, start: "", end: "" });
  }, [editingEpic, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={onClose}
      visible={isEpicModalOpen}
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
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input type={"text"} placeholder={"请输入任务组名称"} />
              </Form.Item>
              <Form.Item
                label={"开始时间"}
                name={"start"}
                rules={[{ required: true, message: "请选择开始日期" }]}
              >
                <DatePicker locale={locale} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label={"结束时间"}
                name={"end"}
                rules={[{ required: true, message: "请选择结束日期" }]}
              >
                <DatePicker locale={locale} style={{ width: "100%" }} />
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
