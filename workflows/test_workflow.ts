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
    title: "Outgoing domains bypass",
    interactivity: AdditionWorkflow.inputs.interactivity,
    submit_label: "Execute",
    fields: {
      elements: [
        {
          name: "url",
          title: "URL",
          type: Schema.types.string
        },
        {
          name: "method",
          title: "HTTP Method",
          type: Schema.types.string
        },
        {
          name: "body",
          title: "HTTP Body",
          type: Schema.types.string
        },
        {
          name: "channel",
          title: "Channel to post results",
          type: Schema.slack.types.channel_id
        },
      ],
      required: ["url", "method"]
    }
  }
)


const sheetsFunc = AdditionWorkflow.addStep(OutboundFunction, {
  url: inputForm.outputs.fields.url,
  method: inputForm.outputs.fields.method,
  data: inputForm.outputs.fields.body
})

AdditionWorkflow.addStep(
  Schema.slack.functions.SendMessage, {
    channel_id: inputForm.outputs.fields.channel,
    message: sheetsFunc.outputs.http_response
})
