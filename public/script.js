const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

/* 新增表單項目 */
function addEntry() {
  // 選取下拉選單中選定的目標容器
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  
  // 計算目前容器內已有的文字輸入框數量，加 1 作為新項目編號
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

    // 準備要新增的 HTML 字串，包含文字與數字輸入框
  const HTMLString = `
  <div>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="項目"/>
  <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="卡路里" />
</div>`;

  // 將 HTML 插入至目標容器的最後方
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

/* 清除不必要的符號或空白字符 */
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

/* 檢查是否符合科學記號 */
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}


// 將傳入的 NodeList 中所有輸入框的值累加起來
function getCaloriesFromInputs(list) {
  let calories = 0;
  
  for (const item of list) {
    // 清除不必要的符號或空白字符 
    const currVal = cleanInputString(item.value);
    // 檢查是否符合科學記號
    const invalidInputMatch = isInvalidInput(currVal);
    // 如果檢測到無效輸入，彈出提示框顯示無效的值
    if (invalidInputMatch) {
      alert(`無效輸入${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

/* 計算卡路里 */
function calculateCalories(e) {
  // 防止表單提交時頁面重新加載
  e.preventDefault();
  isError = false;

  // 取得各輸入框中的數值
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type='number']"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type='number']"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }
  // 計算實際攝取的總熱量
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  // 計算剩餘熱量 
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  // 判斷是熱量盈餘或熱量赤字
  const surplusOrDeficit = remainingCalories < 0 ? "熱量盈餘" : "熱量赤字";

  // 更新 HTML 頁面
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} 卡路里 ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} 每日熱量預算</p>
  <p>${consumedCalories} 實際攝取熱量</p>
  <p>${exerciseCalories} 運動消耗熱量</p>
  `;

  // 從 class 屬性中移除 hide 這個樣式
  output.classList.remove("hide");
}


/* 清除表單 */
function clearForm() {
  // 選取所有容器，並將它們轉為陣列
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );
  // 將容器清空
  for (const container of inputContainers) {
    container.innerHTML = "";
  }
  // 清空熱量預算的值
  budgetNumberInput.value = "";
  // 清空結果文字內容
  output.innerText = "";
  // 從 class 屬性中新增 hide 這個樣式
  output.classList.add("hide");
}

// 綁定事件監聽器
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
