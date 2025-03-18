# docker打包命令
```bash
docker build --platform linux/amd64 -f ./Client.Dockerfile -t codeeditor-client .
docker build --platform linux/amd64 -f ./Server.Dockerfile -t codeeditor-server .
```
# 推送harbor
```bash
docker tag codeeditor-client xxx/codeeditor/codeeditor-client
docker push xxx/codeeditor/codeeditor-client

docker tag codeeditor-server xxx/codeeditor/codeeditor-server
docker push xxx/codeeditor/codeeditor-server
```
