# docker打包命令
```bash
docker build --platform linux/amd64 -f ./Client.Dockerfile -t codeeditor-client .
docker build --platform linux/amd64 -f ./Server.Dockerfile -t codeeditor-server .
```
# 推送harbor
```bash
docker tag codeeditor-client 182.92.214.5:8005/codeeditor/codeeditor-client
docker push 182.92.214.5:8005/codeeditor/codeeditor-client

docker tag codeeditor-server 182.92.214.5:8005/codeeditor/codeeditor-server
docker push 182.92.214.5:8005/codeeditor/codeeditor-server
```
