"use client";
import { Amplify } from "aws-amplify";

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION || "",
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
      oauth: {
        domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
        scope: process.env.NEXT_PUBLIC_COGNITO_SCOPE,
        responseType: "code",
        redirectSignIn: window.location.origin + "/callback",
        redirectSignOut: window.location.origin + "/",
      },
    },
  },
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;
