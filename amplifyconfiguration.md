{
  "aws_project_region": "us-east-1",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_hnNI7XgTH",
  "aws_user_pools_web_client_id": "72fcbj8ki3qthmt792mv2p73hi",
  "oauth": {
    "domain": "",
    "scope": [
      "email",
      "openid",
      "phone",
      "aws.cognito.signin.user.admin"
    ],
    "redirectSignIn": "http://localhost:3000",
    "redirectSignOut": "http://localhost:3000",
    "responseType": "code"
  },
  "federationTarget": "COGNITO_IDENTITY_POOLS",
  "aws_cognito_username_attributes": [
    "EMAIL"
  ],
  "aws_cognito_social_providers": [
    "GOOGLE"
  ],
  "aws_cognito_signup_attributes": [],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 8,
    "passwordPolicyCharacters": [
      "REQUIRES_LOWERCASE",
      "REQUIRES_UPPERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_SYMBOLS"
    ]
  },
  "aws_cognito_verification_mechanisms": [
    "EMAIL"
  ]
}


// {
//   "aws_project_region": "ap-southeast-1",
//   "aws_cognito_region": "ap-southeast-1",
//   "aws_user_pools_id": "ap-southeast-1_AZTq7PLmF",
//   "aws_user_pools_web_client_id": "15sbg8vkbkq0smiqjaeme6naoj",
//   "oauth": {
//     "domain": "auth.vibzi.co",
//     "scope": [
//       "email",
//       "openid",
//       "profile",
//       "aws.cognito.signin.user.admin"

//     ],
//     "redirectSignIn": "https://vibzi.co/my-trips",
//     "redirectSignOut": "https://vibzi.co",
//     "responseType": "code"
//   },
//   "federationTarget": "COGNITO_IDENTITY_POOLS",
//   "aws_cognito_username_attributes": [
//     "EMAIL"
//   ],
//   "aws_cognito_social_providers": [
//     "GOOGLE"
//   ],
//   "aws_cognito_signup_attributes": [],
//   "aws_cognito_mfa_configuration": "OFF",
//   "aws_cognito_mfa_types": [],
//   "aws_cognito_password_protection_settings": {
//     "passwordPolicyMinLength": 8,
//     "passwordPolicyCharacters": [
//       "REQUIRES_LOWERCASE",
//       "REQUIRES_UPPERCASE",
//       "REQUIRES_NUMBERS",
//       "REQUIRES_SYMBOLS"
//     ]
//   },
//   "aws_cognito_verification_mechanisms": [
//     "EMAIL"
//   ]
// }
