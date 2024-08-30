# 使用官方的 Node.js 作为基础镜像
FROM node:alpine


WORKDIR /app
COPY ./package.json /package.json

RUN npm install --legacy-peer-deps --registry https://registry.npmmirror.com

COPY . .

# COPY ./apps/server/package.json /apps/server/package.json
# 设置工作目录
# WORKDIR /app/apps/server

# 复制 package.json 和 package-lock.json

RUN npm run build:server


WORKDIR /app/apps/server
# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["node". "/dist/apps/server/main.js"]