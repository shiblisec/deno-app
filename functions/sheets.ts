import { SlackFunction } from "deno-slack-sdk/mod.ts"
import { SheetsFunction } from "./sheets_function.ts";

export default SlackFunction(
    SheetsFunction, // Define custom function
    async ({ inputs, client }) => {
      // Get the token:
      const tokenResponse = await client.apps.auth.external.get({
        external_token_id: inputs.googleAccessTokenId,
      });
      if (tokenResponse.error) {
        const error =
          `Failed to retrieve the external auth token due to ${tokenResponse.error}`;
        return { error };
      }
  
      // If the token was retrieved successfully, use it:
      const externalToken = tokenResponse.external_token;
      // Make external API call with externalToken
  
      const updatedMsg =
        `:newspaper: Message for${inputs.googleAccessTokenId} !\n\n>${externalToken}`;
  
      return { outputs: { updatedMsg } };
    },
  );