import { Form, Input, Select } from "antd";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: { username: string; personId: number };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder={"项目名"}
          value={param.username}
          onChange={(evt) =>
            setParam({
              ...param,
              username: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
