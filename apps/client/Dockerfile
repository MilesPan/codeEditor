# packages/client/Dockerfile
# 使用官方的 Node.js 作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY ../../package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 构建前端应用（假设你使用的是 React 或其他构建工具）
RUN npm run build

# 使用轻量级的 nginx 镜像来提供静态文件服务
FROM nginx:alpine

# 复制构建输出到 nginx 的默认目录
COPY --from=build /usr/src/app/apps/client/dist /usr/share/nginx/html

# 复制自定义的 nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 nginx 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]