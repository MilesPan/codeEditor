# 使用官方的 Node.js 作为基础镜像
FROM node:lts-alpine as builder

WORKDIR /app
COPY ./package.json /package.json

RUN rm -rf node_modules
RUN npm install --legacy-peer-deps --registry https://registry.npmmirror.com

COPY . .

RUN npm run build:client
FROM nginx
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

