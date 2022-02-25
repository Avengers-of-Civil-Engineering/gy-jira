import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { RegisterForm } from "types/auth";

export const Register = ({
  onSuccess,
}: {
  onSuccess: (value: boolean) => void;
}) => {
  const { register } = useAuth();

  const handleRegister = async ({ cpassword, ...value }: RegisterForm) => {
    console.log("register-value", value);
    if (cpassword === value.password) {
      try {
        await register(value);
        onSuccess(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("密码不一致");
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
