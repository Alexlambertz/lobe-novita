FROM node:18-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./package.json ./
RUN npm install
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
