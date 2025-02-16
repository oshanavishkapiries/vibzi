const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
  response_type: process.env.NEXT_PUBLIC_COGNITO_RESPONSE_TYPE,
  scope: process.env.NEXT_PUBLIC_COGNITO_SCOPE,
};
export default cognitoAuthConfig;
