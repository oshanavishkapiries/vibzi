FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["sh", "-c", "echo \"NEXT_PUBLIC_COGNITO_AUTHORITY=$NEXT_PUBLIC_COGNITO_AUTHORITY\nNEXT_PUBLIC_COGNITO_CLIENT_ID=$NEXT_PUBLIC_COGNITO_CLIENT_ID\nNEXT_PUBLIC_COGNITO_REDIRECT_URI=$NEXT_PUBLIC_COGNITO_REDIRECT_URI\nNEXT_PUBLIC_COGNITO_RESPONSE_TYPE=$NEXT_PUBLIC_COGNITO_RESPONSE_TYPE\nNEXT_PUBLIC_COGNITO_SCOPE=$NEXT_PUBLIC_COGNITO_SCOPE\nNEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL\" > .env && npm start"]