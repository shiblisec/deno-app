import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts"

export const SheetsFunction = DefineFunction({
    callback_id: "sheets_function",
    title: "Sample Sheets Function",
    description: "This is a sample external function",
    source_file: "functions/sheets.ts",
    input_parameters: {
        properties: {
          message: {
            type: Schema.types.string,
            description: "Message to be posted",
          },
          // Define token here
          googleAccessTokenId: {
            type: Schema.slack.types.oauth2,
            oauth2_provider_key: "google",
          },
        },
        required: ["message"],
      },
      output_parameters: {
        properties: {
          updatedMsg: {
            type: Schema.types.string,
            description: "Updated message to be posted",
          },
        },
        required: ["updatedMsg"],
      },
});