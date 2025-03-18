# 使用 node:lts-alpine 作为基础镜像
FROM node:18-alpine

# 安装一些必要的包和 sudo（因为 alpine 版本通常没有预装 sudo）
RUN apk update && apk add --no-cache bash sudo shadow

# 创建用户并将其加入 sudo 组
RUN useradd -m -s /bin/bash user \
  && echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# 切换到新用户
USER user

# 设置工作目录
WORKDIR /home/user

# 设置 npm 镜像源，并安装项目依赖
RUN npm config set registry https://registry.npmmirror.com \
  && npm init -y \
  && npm install mocha chai typescript

# 暴露端口（如果需要的话）
EXPOSE 3000

# 使用 /bin/sh -c 来执行命令
CMD ["/bin/bash", "-c", "node & tail -f /dev/null"]
