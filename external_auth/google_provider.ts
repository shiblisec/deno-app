// manifest.ts
import { DefineFunction, DefineOAuth2Provider, DefineWorkflow, Manifest, Schema,} from "deno-slack-sdk/mod.ts";
// ...

// Define a new OAuth2 provider
// Note: replace <your_client_id> with your actual client ID
// if you're following along and creating an OAuth2 provider for
// Google.
const GoogleProvider = DefineOAuth2Provider({
  provider_key: "google",
  provider_type: Schema.providers.oauth2.CUSTOM,
  options: {
    provider_name: "Google",
    authorization_url: "https://accounts.google.com/o/oauth2/auth",
    token_url: "https://oauth2.googleapis.com/token",
    client_id: "",
    scope: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    authorization_url_extras: {
      prompt: "consent",
      access_type: "offline",
    },
    identity_config: {
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
      account_identifier: "$.email",
      http_method_type: "GET",
    },
    use_pkce: false,
  },
});

export default GoogleProvider

// ...
