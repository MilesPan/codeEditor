# docker打包命令
```bash
docker build --platform linux/amd64 -f ./Client.Dockerfile -t codeeditor-client .
docker build --platform linux/amd64 -f ./Server.Dockerfile -t codeeditor-server .
```
# 推送harbor
```bash
docker tag codeeditor-client xxx/code-editor/codeeditor-client
docker push xxx/code-editor/codeeditor-client

docker tag codeeditor-server xxx/code-editor/codeeditor-server
docker push xxx/code-editor/codeeditor-server
```
