import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts"
import { AdditionFunctionDefinition } from "../functions/add_numbers.ts";
import { Connectors } from "deno-slack-hub/mod.ts"

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
      }
    }
  }
});

const inputForm = AdditionWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Add two numbers",
    interactivity: AdditionWorkflow.inputs.interactivity,
    submit_label: "Add",
    fields: {
      elements: [
        {
          name: "num1",
          title: "Number-1",
          type: Schema.types.integer
        },
        {
          name: "num2",
          title: "Number-2",
          type: Schema.types.integer
        },
        {
          name: "channel",
          title: "Channel to post results",
          type: Schema.slack.types.channel_id
        }
      ],
      required: ["num1", "num2"]
    }
  }
)

const AdditionFunction = AdditionWorkflow.addStep(AdditionFunctionDefinition, {
  number_one: inputForm.outputs.fields.num1,
  number_two: inputForm.outputs.fields.num2
})

AdditionWorkflow.addStep(
  Schema.slack.functions.SendMessage, {
    channel_id: inputForm.outputs.fields.channel,
    message: AdditionFunction.outputs.final_result
})

AdditionWorkflow.addStep(Connectors.GoogleSheets.functions.AddSpreadsheetRow, {
  spreadsheet_id: "1kVygtHWHLFU_vtoJQaasOs8GOUhMrMvGwgiwdW2vkBg",
  sheet_title: "Sheet1",
  columns: {
    "0": "hello",
    "1": "hello",
    "2": "hello"
  },
  google_access_token: {credential_source: "END_USER"}

})