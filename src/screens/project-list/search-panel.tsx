import { Form, Input, Select } from "antd";
import { useState } from "react";

export const SearchPanel = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // const [users, setUsers] = useState([])

  // useEffect(() => {

  // })

  return (
    <Form>
      <Form.Item>
        <Input
          type="text"
          placeholder={"项目名"}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
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
        </Select>
      </Form.Item>
    </Form>
  );
};
