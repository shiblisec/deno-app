import { SlackFunction } from "deno-slack-sdk/mod.ts"
import { AdditionFunctionDefinition } from "./add_numbers.ts"

export default SlackFunction(
    AdditionFunctionDefinition,
    async ({inputs, env, client}) => {
        const { number_one, number_two } = inputs;
        console.log(number_one)
        console.log(number_two)

        console.log(env["SLACK_BOT_TOKEN"])
        console.log(env["HTTP_PROXY"])
        
        const final_result = "The addition is: "+String(number_one + number_two)
        
        return { outputs: { final_result }};
    }
);



