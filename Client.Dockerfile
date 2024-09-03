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
FROM nginx:latest
COPY --from=0 /app/apps/client/dist /usr/share/nginx/html

# 暴露应用运行的端口
EXPOSE 8080

# 启动应用
CMD ["nginx", "-g" , "daemon off;"]