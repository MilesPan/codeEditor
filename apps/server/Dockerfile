# 使用官方的 Node.js 作为基础镜像
FROM node:18 as builder

RUN npm install -g pnpm

# 设置时区
ENV TZ=Asia/Shanghai \
  DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./ ./

RUN pnpm install


# 设置工作目录
WORKDIR /app/apps/server

# 复制 package.json 和 package-lock.json

RUN pnpm build

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run" , "start:prod"]