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
    title: "Select a Channel",
    interactivity: AdditionWorkflow.inputs.interactivity,
    submit_label: "Execute",
    fields: {
      elements: [
        {
          name: "user_channel",
          title: "Canvas to update",
          type: Schema.slack.types.channel_id
        }
      ],
      required: ["user_channel"]
    }
  }
)

// const canvas_share = AdditionWorkflow.addStep(Schema.slack.functions.ShareCanvas, {
//   canvas_id: "F07CDNFEHF0",
//   access_level: "view",
//   user_ids: [inputForm.outputs.fields.user]
// })

 const sheetsOutput = AdditionWorkflow.addStep(SheetsFunction, {
   googleAccessTokenId: {
     credential_source: "END_USER"
   },
 })

AdditionWorkflow.addStep(
  Schema.slack.functions.SendMessage, {
    channel_id: inputForm.outputs.fields.user_channel,
    message: sheetsOutput.outputs.updatedMsg
})

