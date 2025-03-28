import { Manifest } from "deno-slack-sdk/mod.ts";
import { AdditionWorkflow } from "./workflows/test_workflow.ts";
import { AdditionFunctionDefinition } from "./functions/add_numbers.ts";
import { SheetsFunction } from "./functions/sheets_function.ts";
import "std/dotenv/load.ts"
import GoogleProvider from "./external_auth/google_provider.ts";
/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "my-new-test-app",
  description: "A blank template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  functions: [AdditionFunctionDefinition, SheetsFunction],
  externalAuthProviders: [GoogleProvider],
  outgoingDomains: ["d204-2405-201-684a-3810-1010-a8b7-3dd9-4d6a.ngrok-free.app"],
  botScopes: ["commands", "chat:write", "chat:write.public", "im:write","groups:write"],
  features: {
    appHome: {
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: false,
    },
  },
});
