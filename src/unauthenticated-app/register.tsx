import { Button, Form, Input } from "antd";

export const Register = () => {
  return (
    <div>
      <Form>
        <Form.Item
          name={"username"}
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input type="text" id={"username"} placeholder={"用户名"} />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input type="text" id={"password"} placeholder={"密码"} />
        </Form.Item>
        <Form.Item
          name={"cpassword"}
          rules={[{ required: true, message: "请确认密码" }]}
        >
          <Input type="text" id={"cpassword"} placeholder={"确认密码"} />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
