import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { AuthForm } from "types/auth";

export const Login = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { login } = useAuth();

  const handleLogin = async (value: AuthForm) => {
    console.log("auth-value", value);
    try {
      await login(value);
      onError(null);
    } catch (error: any) {
      console.log(error);
      const errorData = {
        name: "login",
        message: "登陆失败, 用户名或密码错误",
      };
      errorData.message = error?.username || error?.non_field_errors;
      if (error) {
        onError(errorData);
      }
    }
  };

  return (
    <div>
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
          <Input type="password" id={"password"} placeholder={"密码"} />
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
