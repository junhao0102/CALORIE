const express = require("express"); // 引入 Express
const path = require("path"); // 引入 Path
const { Pool } = require("pg"); // 引入 PostgreSQL
const SQL = require("./SQL"); // 引入 SQL.js
const bodyParser = require("body-parser"); // Express 中間件
const app = express(); // 初始化 Express 應用程式
const port = 3000; // 伺服器端口號

// PostgreSQL 資料庫連線配置
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "database",
  password: "password",
  port: 5432,
});

// 創建資料表的異步函數
async function createTable() {
  try {
    await pool.query(SQL.createTable);
    console.log("資料表初始化成功");
  } catch (err) {
    console.error("創建資料表失敗", err);
    throw err;
  }
}

// 中間件：解析 JSON 請求
app.use(bodyParser.json());

// 設置靜態資源目錄
app.use(express.static(path.join(__dirname, "public")));

// 設置主頁路由
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 設置繳交路由
app.post("/submit", async (req, res) => {
  const data = req.body;
  // 解構請求中的資料
  const { date, surplusOrDeficit, remainingCalories } = data;
  try {
    // 插入資料到資料庫
    const result = await pool.query(SQL.insertTable, [date, surplusOrDeficit, remainingCalories]);
    res.status(200).json({
      status: "success",
      message: "表單提交成功！",
      receivedData: data,
    });
  } catch (error) {
    console.error("資料庫操作失敗:", error);
    res.status(500).json({
      status: "error",
      message: "資料庫操作失敗！",
    });
  }
});

// 啟動伺服器並初始化資料表
const startServer = async () => {
  try {
    await createTable();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("伺服器啟動失敗:", err.message);
    process.exit(1); // 啟動失敗時退出程式
  }
};

// 啟動伺服器
startServer();
