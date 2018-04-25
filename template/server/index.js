/* @flow */
const Hull = require("hull");
const express = require("express");

const server = require("./server");

const { LOG_LEVEL, SECRET, PORT, NODE_ENV } = process.env;

if (LOG_LEVEL) {
  Hull.logger.transports.console.level = LOG_LEVEL;
}

Hull.logger.transports.console.json = true;

const options = {
  hostSecret: SECRET || "1234",
  port: PORT || 8082,
};

const app = express();
const connector = new Hull.Connector(options);

if (NODE_ENV === "development") {
  const devMode = require("./lib/dev-mode"); // eslint-disable-line global-require
  devMode(app);
}

connector.setupApp(app);
server(app, { hostSecret: options.hostSecret });
connector.startApp(app);
