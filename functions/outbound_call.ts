import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts"

export const OutboundFunction = DefineFunction({
    callback_id: "outbound_call",
    title: "Make external HTTP calls",
    description: "This is a sample external function",
    source_file: "functions/http.ts",
    input_parameters: {
        properties: {
          url: {
            type: Schema.types.string,
            description: "Outgoing URL",
          },
          // Define token here
          method: {
            type: Schema.types.string,
            description: "HTTP method"
          },
          data: {
            type: Schema.types.string,
            description: "HTTP Body"
          }
        },
        required: ["url", "method", "data"],
      },
      output_parameters: {
        properties: {
          http_response: {
            type: Schema.types.string,
            description: "HTTP Call Executed Successfully",
          },
        },
        required: ["http_response"],
      },
});