import { Manifest } from "deno-slack-sdk/mod.ts";
import { AdditionWorkflow } from "./workflows/test_workflow.ts";
import { AdditionFunctionDefinition } from "./functions/add_numbers.ts";
/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "my-new-test-app",
  description: "A blank template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  functions: [AdditionFunctionDefinition],
  workflows: [AdditionWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "canvases:write", "canvases:read"],
  features: {
    appHome: {
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: false,
    },
  },
});
