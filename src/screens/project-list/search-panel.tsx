import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";

interface SearchPanelProps {
  param: { username: string; personId: number };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
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
        <UserSelect
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
