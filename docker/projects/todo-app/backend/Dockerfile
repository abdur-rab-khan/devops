FROM node:24-alpine AS build

WORKDIR /usr/src/todo-backend

RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/*

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm store prune && \
    rm -rf /root/.cache

COPY . .

RUN pnpm run build && \
    pnpm prune --prod

FROM node:24-alpine AS production

WORKDIR /usr/src/todo-backend

COPY package.json pnpm-lock.yaml ./
COPY --from=build /usr/src/todo-backend/dist ./dist
COPY --from=build /usr/src/todo-backend/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]