import { AuthProviderProps } from "react-oidc-context";

const cognitoAuthConfig: AuthProviderProps = {
  authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY || "",
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
  redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
  scope: process.env.NEXT_PUBLIC_COGNITO_SCOPE || "",
  monitorSession: true,
  loadUserInfo: true
};

export default cognitoAuthConfig;
