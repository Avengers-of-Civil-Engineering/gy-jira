import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl } from "./utils";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);

  const { mutateAsync: addTask } = useAddTask();
  const projectId = useProjectIdInUrl();

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setName("");
  };

  const toggle = () => setInputMode(!inputMode);

  // 每次加载页面时，若不是输入状态，清空未提交的任务名
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        autoFocus={true}
        onBlur={toggle}
        placeholder={"请输入任务名"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
