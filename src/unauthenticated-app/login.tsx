import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { AuthForm } from "types/auth";

export const Login = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { login } = useAuth();

  // 登陆请求及错误处理
  const handleLogin = async (value: AuthForm) => {
    console.log("auth-value", value);
    try {
      await login(value);
      onError(null);
    } catch (error: any) {
      const errorData = {
        name: "login",
        message: "登陆失败, 用户名或密码错误",
      };
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log("error.response", error.response);
        const data = error.response?.data;
        errorData.message = data?.username || data?.non_field_errors;
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        console.log("error.request", error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
      }

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
