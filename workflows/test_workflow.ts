import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts"
import { AdditionFunctionDefinition } from "../functions/add_numbers.ts";
import { Connectors } from "deno-slack-hub/mod.ts"
import { SubtractFunctionDefinition } from "../functions/subtract_numbers.ts";
import { SheetsFunction } from "../functions/sheets_function.ts";
import { OutboundFunction } from "../functions/outbound_call.ts";

export const AdditionWorkflow = DefineWorkflow({
  callback_id: "add_workflow",
  title: "Add numbers",
  input_parameters: {
    required: ["interactivity"],
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    }
  }
});

const inputForm = AdditionWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Select an owners",
    interactivity: AdditionWorkflow.inputs.interactivity,
    submit_label: "Execute",
    fields: {
      elements: [
        {
          name: "user",
          title: "Canvas to update",
          type: Schema.slack.types.user_id
        }
      ],
      required: ["user"]
    }
  }
)

const canvas_share = AdditionWorkflow.addStep(Schema.slack.functions.ShareCanvas, {
  canvas_id: "F07CDNFEHF0",
  access_level: "view",
  user_ids: [inputForm.outputs.fields.user]
})

// AdditionWorkflow.addStep(SheetsFunction, {
//   number_one: inputForm.outputs.fields.num1,
//   number_two: inputForm.outputs.fields.num2,
//   message: "hello",
//   googleAccessTokenId: {
//     credential_source: "DEVELOPER"
//   },
// })

/*AdditionWorkflow.addStep(
  Schema.slack.functions.SendMessage, {
    channel_id: inputForm.outputs.fields.channel,
    message: "canvas shared"+canvas_share.outputs.canvas_id
})*/

