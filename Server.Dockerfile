# 构建阶段
FROM node:20-alpine3.19 AS builder

WORKDIR /app
COPY ./apps/server/dist ./dist
COPY ./apps/server/prisma ./prisma
COPY ./apps/server/package.json ./package.json

# 只安装生产依赖
RUN npm install --production --registry https://registry.npmmirror.com \
    && npx prisma generate

# 最终阶段
FROM node:20-alpine3.19 AS production

# 创建非root用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# 只复制必要的文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 切换到非root用户
USER appuser

EXPOSE 3000

CMD ["node", "dist/apps/server/src/main.js"]