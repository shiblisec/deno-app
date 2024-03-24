import { Trigger } from "deno-slack-api/types.ts";
import { AdditionWorkflow } from "../workflows/test_workflow.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";

const trigger: Trigger<typeof AdditionWorkflow.definition> = {
  // your TypeScript payload
  type: TriggerTypes.Shortcut,
  name: "Sample trigger",
  description: "A sample trigger",
  workflow: "#/workflows/add_workflow",
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
  },
};

export default trigger;
