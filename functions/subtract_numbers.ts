import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts"

export const SubtractFunctionDefinition = DefineFunction({
    callback_id: "subtract_numbers",
    title: "Subtract two numbers",
    description: "The function can perform subtraction operation on two integers",
    source_file: "functions/subtraction.ts",
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