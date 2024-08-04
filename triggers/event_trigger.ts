import { Trigger } from "deno-slack-api/types.ts";
import { AdditionWorkflow } from "../workflows/test_workflow.ts";
import { TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";

const trigger: Trigger<typeof AdditionWorkflow.definition> = {
    type: TriggerTypes.Event,
    name: "Reactji response",
    description: "responds to a specific reactji",
    workflow: "#/workflows/add_workflow",
    event: {
      event_type: TriggerEventTypes.ReactionAdded,
      channel_ids: ["C040ZN035QR"],
      filter: {
        version: 1,
        root: {
          statement: "{{data.reaction}} == sunglasses"
        }
      }
    },
    inputs: {
      stringtoSend: {
        value: "how cool is that",
      },
      channel: {
        value: "C040ZN035QR",
      },
    },
  };

export default trigger;