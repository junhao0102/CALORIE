const createTable = `
CREATE TABLE IF NOT EXISTS CALORIE(
    id SERIAL PRIMARY KEY,        -- 自增主鍵
    date DATE NOT NULL,           -- 日期欄位
    category VARCHAR(255),        -- 類型欄位
    name VARCHAR(255),            -- 名稱欄位
    calories INT                  -- 熱量欄位
);
`;





module.exports = {createTable};