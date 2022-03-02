import { rest } from "msw";
import { setupServer } from "msw/node";
import { get } from "utils/request";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("get 可以进行异步请求", async () => {
  const endpoint = "test";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`/api/v1/${endpoint}/`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await get(`/api/v1/${endpoint}/`);

  expect(result).toEqual(mockResult);
});
