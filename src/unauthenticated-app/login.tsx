import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { AuthForm } from "types/auth";

export const Login = () => {
  const { login } = useAuth();

  const handleLogin = async (value: AuthForm) => {
    console.log("auth-value", value);
    try {
      await login(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <span>
        {user ? `hello ${user.name}` : null}
      </span> */}
      <Form onFinish={handleLogin}>
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
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
