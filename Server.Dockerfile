# 使用官方的 Node.js 作为基础镜像
FROM node:16-alpine as builder


WORKDIR /app
COPY ./package.json /package.json

RUN npm install --legacy-peer-deps --registry https://registry.npmmirror.com

COPY . .

RUN npm run build:server
FROM node:16-alpine
COPY wait-for .
COPY --from=builder /app/apps/server/dist /app/server/dist
COPY --from=builder /app/apps/server/prisma /app/server/dist/prisma
COPY --from=builder /app/apps/server/package.json /app/server/dist/package.json
 
WORKDIR /app/server/dist
RUN npm install --registry https://registry.npmmirror.com
RUN npx prisma generate
# RUN npx prisma migrate dev --name init

WORKDIR /app
# 暴露应用运行的端口
EXPOSE 3000

# 启动应用

CMD ["node", "/app/server/dist/apps/server/src/main.js"]