import { Mark } from "components/Mark";
import { screen, render } from "@testing-library/react";

test("Mark 组件正确高亮关键词", () => {
  const name = "项目管理开发";
  const keyword = "管理";

  render(<Mark name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257AFD");
  expect(screen.getByText("项目")).not.toHaveStyle("color: #257AFD");
});
