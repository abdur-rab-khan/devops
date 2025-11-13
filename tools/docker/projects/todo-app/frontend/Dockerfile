FROM node:24-alpine AS build

WORKDIR /usr/lib/todo-frontend

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lock && \
    pnpm store prune && \
    rm -rf /root/.cache

COPY . .

RUN pnpm run build && \
    pnpm prune --prod

FROM node:24-alpine AS production

WORKDIR /usr/lib/todo-frontend

COPY --from=build /usr/lib/todo-frontend/dist ./dist

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]