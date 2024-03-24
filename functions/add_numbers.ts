import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts"

export const AdditionFunctionDefinition = DefineFunction({
    callback_id: "add_numbers",
    title: "Add two numbers",
    description: "The function can perform addition operation on two integers",
    source_file: "functions/addition.ts",
    input_parameters: {
        properties: {
            number_one:{
                type: Schema.types.integer,
                description: "Integer one"
            },
            number_two:{
                type: Schema.types.integer,
                description: "Integer two"
            }
        },
        required: ["number_one", "number_two"]
    },
    output_parameters: {
        properties: {
            final_result: {
                type: Schema.types.string,
                description: "Final result"
            }
        },
        required: ["final_result"]
    }
})