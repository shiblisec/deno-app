import { SlackFunction } from "deno-slack-sdk/mod.ts"
import { OutboundFunction } from "./outbound_call.ts";

export default SlackFunction(
    OutboundFunction, // Define custom function
    async ({ inputs, env}) => {
      // Get the token:
      
      const proxy_url = env["PROXY_URL"]
      const xoxctoken = env["XOXC_TOKEN"]
      const xoxdtoken = env["XOXD_TOKEN"]
      const appid = env["APP_ID"]
      
      const url = inputs.url
      let method = inputs.method
      if (method == "" || method == null)
        method = "GET"
      
      const body = inputs.data
      const encoded_request = btoa(`{"url": "${url}", "method": "${method}", "body": "${body}"}`)
      const final_proxy_url = proxy_url+"?http_data="+encoded_request  
      console.log(final_proxy_url)
      const req_url = `https://slack.com/api/developer.apps.events.subscriptions.verifyURL?token=${xoxctoken}&app=${appid}&url=${final_proxy_url}`
      console.log(req_url)
      const response = await fetch(req_url, {
        headers: {
            cookie: `d=${xoxdtoken};`
        }
      })
      const text = await response.text()
      console.log(text)

      const http_response = "Executed Successfully"
  
      return { outputs: { http_response } };
    },
  );