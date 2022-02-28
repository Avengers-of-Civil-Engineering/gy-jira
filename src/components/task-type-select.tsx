import React from "react";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const taskTypes = [
    { id: 1, username: "task" },
    { id: 2, username: "bug" },
  ];
  return <IdSelect options={taskTypes || []} {...props} />;
};
