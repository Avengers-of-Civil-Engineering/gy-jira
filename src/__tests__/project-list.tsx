import React, { ReactNode } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import fakeData from "./fake.json";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "screens/project-list";
import { AppProviders } from "context";

const fakeAuth = {
  id: 1,
  username: "jack",
  token: "123",
};

const server = setupServer(
  rest.get("/api/v1/about-me/", (req, res, ctx) => res(ctx.json(fakeAuth))),
  rest.get("/api/v1/users/", (req, res, ctx) => res(ctx.json(fakeData.users))),

  rest.get("/api/v1/projects/", (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const result = fakeData?.projects?.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true)
      );
    });
    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument(), {
    timeout: 3000,
  });

test("项目列表展示正常", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目功能", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

export const renderScreen = (UI: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<AppProviders>{UI}</AppProviders>);
};
