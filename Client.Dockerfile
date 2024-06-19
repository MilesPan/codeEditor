# 使用官方的 Node.js 作为基础镜像
FROM node:18 as builder

# 设置时区
ENV TZ=Asia/Shanghai \
  DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./package.json /package.json

RUN npm install --registry https://registry.npmmirror.com

COPY . .

COPY ./apps/client/package.json /apps/client/package.json
# 设置工作目录
WORKDIR /app/apps/client

# 暴露应用运行的端口
EXPOSE 3030

# 启动应用
CMD ["npm", "run" , "dev"]