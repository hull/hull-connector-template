/* @flow */
import type { $Application, $Response } from "express";
// import type { TRequest, THullReqContext } from "hull";

const { notificationHandler, batchHandler, schedulerHandlers } = require("hull/lib/handlers");
const bodyParser = require("body-parser");

const { webhookHandler, statusCheck, updateUser } = require("./actions");
const notificationConfiguration = require("./notification-configuration");

function server(app: $Application, { token }: Object): $Application {
  app.get("/admin.html", (req: TRequest, res: $Response) => {
    res.render("admin.html", { hostname: req.hostname, token });
  });

  app.all("/webhook", bodyParser.json(), webhookHandler);

  app.use("/status", schedulerHandler(statusCheck));

  app.use("/batch", batchHandler(notificationConfiguration));
  app.use("/account-batch", batchHandler(notificationConfiguration));
  app.use("/smart-notifier", notificationHandler(notificationConfiguration));

  // you can use object spread syntax
  const a = { a: 1 };
  const b = { b: 2 };
  const c = { ...a, ...b, c: 3 };

  console.log(c);

  // you can use async/await
  async function testAsync() {
    await Promise.resolve();
  }
  testAsync();

  return app;
}

module.exports = server;
