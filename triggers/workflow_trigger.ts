import { Trigger } from "deno-slack-api/types.ts";
import { SayHiWorkflow } from "../workflows/test_workflow.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";

const trigger: Trigger<typeof SayHiWorkflow.definition> = {
  // your TypeScript payload
  type: TriggerTypes.Shortcut,
  name: "Sample trigger",
  description: "A sample trigger",
  workflow: "#/workflows/say_hello_workflow",
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
  },
};

export default trigger;
