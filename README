### Docker Hub 下載官方的 PostgreSQL 映像：
```
docker pull postgres
```

### 使用 docker run 命令來運行 PostgreSQL 容器:

```
docker run --name my_postgres \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=database \
  -p 5432:5432 \
  -d postgres
```
- PostgreSQL 容器的服務綁定到主機的 localhost:5432。
- 本機應用程序可以使用 localhost 或 127.0.0.1 來連接資料庫。

### 使用 docker-compose 運行多服務
```
docker-compose up -d 
```

### 停止並刪除所有服務及其卷
```
docker-compose down -v
```

### 停用本機 PostgreSQL 端口

```
sudo service postgresql stop
```



