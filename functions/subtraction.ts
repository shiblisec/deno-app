import { SlackFunction } from "deno-slack-sdk/mod.ts"
import { AdditionFunctionDefinition } from "./add_numbers.ts"

export default SlackFunction(
    AdditionFunctionDefinition,
    async ({inputs}) => {
        const { number_one, number_two } = inputs;
        console.log(number_one)
        console.log(number_two)
        
        const final_result = "The subtraction is: "+String(number_one - number_two)
        
        return { outputs: { final_result }};
    }
);



