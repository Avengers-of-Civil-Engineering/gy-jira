import React from "react";
import { useEpics } from "utils/epic";
import { IdSelect } from "./id-select";

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: allEpics } = useEpics();
  const epics = allEpics?.map((epic) => ({ username: epic.name, id: epic.id }));

  return <IdSelect options={epics || []} {...props} />;
};
