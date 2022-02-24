import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  return (
    <ScreenContainer>
      <SearchPanel />
      <List />
    </ScreenContainer>
  );
};
