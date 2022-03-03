import { Modal, Form, Input, Button, Typography } from "antd";
import { IdSelect } from "components/id-select";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEpics } from "utils/epic";
import { useDeleteTask, useEditTask } from "utils/task";
import { useProjectIdInUrl, useTaskModal, useTasksQuerykey } from "./utils";

export const TaskModal = () => {
  const { close, editingTaskId, editingTask } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQuerykey()
  );
  const { mutateAsync: deletetask, isLoading: deleteLoading } = useDeleteTask(
    useTasksQuerykey()
  );

  const [form] = Form.useForm();

  // 提交修改申请
  const submitEdit = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  // 取消修改
  const onCancel = () => {
    close();
    form.resetFields();
  };

  // 提交删除申请
  const submitDelete = () => {
    close();
    Modal.confirm({
      title: "确定删除任务吗",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => await deletetask({ id: Number(editingTaskId) }),
    });

    close();
  };

  // 初次渲染初始化表单内容
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);

  return (
    <Modal
      forceRender={true}
      title={"编辑任务"}
      okText={"确定"}
      cancelText={"取消"}
      onOk={submitEdit}
      onCancel={onCancel}
      confirmLoading={editLoading}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
        <Form.Item label={"任务组"} name={"epicId"}>
          <EpicSelect defaultOptionName={"任务组"} />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button loading={deleteLoading} onClick={submitDelete}>
          删除
        </Button>
      </div>
    </Modal>
  );
};

const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const projectId = useProjectIdInUrl();
  const { data: allEpics } = useEpics();
  const epics = allEpics
    ?.filter((epic) => epic.projectId === projectId)
    .map((epic) => ({ username: epic.name, id: epic.id }));

  if (epics?.length === 0) {
    return (
      <div>
        <Typography.Text type={"danger"}>该项目还没有任务组 </Typography.Text>
        <Link to={`/projects/${projectId}/epic`}>去创建</Link>
      </div>
    );
  }
  return <IdSelect options={epics || []} {...props} />;
};

const layout = {
  // labelCol: 左边的文字标签，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12}
  labelCol: { span: 8 },
  // wrapperCol: 右边的表单，用法同 labelCol
  wrapperCol: { span: 16 },
};
