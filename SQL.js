const createTable = `
CREATE TABLE IF NOT EXISTS CALORIE(
    id SERIAL PRIMARY KEY,        -- 自增主鍵
    date DATE UNIQUE,             -- 日期欄位
    type VARCHAR(256),            -- 類型欄位
    calories INT                  -- 熱量欄位
);
`;

const insertTable = `
INSERT INTO CALORIE(date, type, calories)
VALUES ($1, $2, $3)
ON CONFLICT (date)                 --違反UNIQUE
DO UPDATE SET 
  type = EXCLUDED.type,            -- 更新 type 欄位為新插入的值
  calories = EXCLUDED.calories;    -- 更新 calories 欄位為新插入的值
`;

module.exports = {createTable,insertTable};