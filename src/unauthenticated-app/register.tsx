import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { RegisterForm } from "types/auth";

export const Register = ({
  onSuccess,
  onError,
}: {
  onSuccess: (value: boolean) => void;
  onError: (error: Error | null) => void;
}) => {
  const { register } = useAuth();

  // 注册请求及错误处理
  const handleRegister = async ({ cpassword, ...value }: RegisterForm) => {
    console.log("register-value", value);
    if (cpassword === value.password) {
      try {
        await register(value);
        onSuccess(false);
        onError(null);
      } catch (error: any) {
        const errorData = {
          name: "register",
          message: "注册失败",
        };
        if (error.response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          console.log("error.response", error.response);
          const data = error.response?.data;
          errorData.message =
            data?.msg || `用户名：${data?.username}` || data?.non_field_errors;
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
    } else {
      console.log("密码不一致");
      onError({ name: "register", message: "密码不一致" });
    }
  };

  return (
    <div>
      <Form onFinish={handleRegister}>
        <Form.Item
          name={"username"}
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input type="text" id={"username"} placeholder={"用户名"} />
        </Form.Item>
        <Form.Item
          name={"email"}
          rules={[{ required: true, message: "请输入邮箱" }]}
        >
          <Input type="text" id={"email"} placeholder={"邮箱"} />
        </Form.Item>
        <Form.Item
          name={"firstName"}
          rules={[{ required: true, message: "请输入昵称" }]}
        >
          <Input type="text" id={"firstName"} placeholder={"昵称"} />
        </Form.Item>
        <Form.Item
          name={"phoneNumber"}
          rules={[{ required: true, message: "请输入手机号" }]}
        >
          <Input type="text" id={"phoneNumber"} placeholder={"手机号"} />
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
