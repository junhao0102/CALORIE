# 使用官方 Node.js 映像作為基底
FROM node:18

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有檔案到容器中
COPY . .

# 暴露埠 3000
EXPOSE 3000

# 啟動伺服器
CMD ["node", "server.js"]
