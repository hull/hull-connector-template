// @flow
import type { HullNotificationHandlerConfiguration, HullContext } from "hull";
import type { HullUserUpdateMessage, HullAccountUpdateMessage } from "hull-client";

const notificationConfiguration: HullNotificationHandlerConfiguration = {
  "user:update": {
    callback: (ctx: HullContext, messages: Array<HullUserUpdateMessage>): Promise<*> => {
      // process users
    },
    options: {

    }
  },
  "account:update": (ctx; HullContext, messages: Array<HullAccountUpdateMessage>): Promise<*> => {
    // process accounts
  }
};

module.exports = notificationConfiguration;
