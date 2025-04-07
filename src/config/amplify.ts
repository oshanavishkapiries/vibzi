"use client";
import { Amplify } from "aws-amplify";

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION || "",
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
      oauth: {
        domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "",
        scope: (
          process.env.NEXT_PUBLIC_COGNITO_SCOPE || "phone email openid profile"
        ).split(" "),
        responseType: "code",
        redirectSignIn:
          typeof window !== "undefined"
            ? window.location.origin + "/callback"
            : "http://localhost:3000/callback",
        redirectSignOut:
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000",
        clientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
        providers: ["Google"],
      },
    },
  },
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;
