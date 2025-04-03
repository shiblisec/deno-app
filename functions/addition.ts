import { SlackFunction } from "deno-slack-sdk/mod.ts"
import { AdditionFunctionDefinition } from "./add_numbers.ts"

export default SlackFunction(
    AdditionFunctionDefinition,
    async ({inputs, env, client}) => {
        const { number_one, number_two } = inputs;
        console.log(number_one)
        console.log(number_two)

        const msgResponse = await client.chat.postMessage({
            channel: "C010MKS02CF",
            // Fallback text to use when rich media can't be displayed (i.e. notifications) as well as for screen readers
            text: "A new time off request has been submitted",
        });
        if (!msgResponse.ok) {
            console.log("Error during request chat.postMessage!", msgResponse.error);
        }
        console.log(msgResponse)
        
        const final_result = "The addition is: "+String(number_one + number_two)
        
        return { outputs: { final_result }};
    }
);



