# 使用官方的 Node.js 作为基础镜像
FROM node:16 as builder

# 设置时区
ENV TZ=Asia/Shanghai \
  DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./package.json /package.json

RUN rm -rf node_modules
RUN npm install --legacy-peer-deps --registry https://registry.npmmirror.com

COPY . .

RUN npm run build:client
FROM nginx
COPY --from=0 /app/apps/client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

