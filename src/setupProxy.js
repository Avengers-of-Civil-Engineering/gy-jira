const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://jira.guying18.com/",
      changeOrigin: true,
    })
  );
};
