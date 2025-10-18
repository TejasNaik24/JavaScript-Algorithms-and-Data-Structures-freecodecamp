// Starting variables as requested
let price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueEl = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");

// Display price on page
priceDisplay.textContent = `$${price.toFixed(2)}`;

purchaseBtn.addEventListener("click", () => {
  let cash = parseFloat(cashInput.value);

  if (isNaN(cash)) {
    alert("Please enter a valid cash amount");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDueEl.textContent = "";
    return;
  }

  if (cash === price) {
    changeDueEl.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeDue = cash - price;
  changeDue = Number(changeDue.toFixed(2));

  // Total cash in drawer
  let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0);
  totalCID = Number(totalCID.toFixed(2));

  if (totalCID < changeDue) {
    changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Currency units highest to lowest
  const currencyUnit = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01],
  ];

  let changeArray = [];
  let changeLeft = changeDue;

  // Use a map to quickly look up currency availability in the drawer
  const drawerMap = new Map(cid);

  for (let i = 0; i < currencyUnit.length; i++) {
    const coinName = currencyUnit[i][0];
    const coinValue = currencyUnit[i][1];
    let coinAvailable = drawerMap.get(coinName) || 0;
    let coinUsed = 0;

    while (changeLeft >= coinValue && coinAvailable > 0) {
      changeLeft = Number((changeLeft - coinValue).toFixed(2));
      coinAvailable = Number((coinAvailable - coinValue).toFixed(2));
      coinUsed = Number((coinUsed + coinValue).toFixed(2));
    }

    if (coinUsed > 0) {
      changeArray.push([coinName, coinUsed]);
    }
  }

  if (changeLeft > 0) {
    changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalCID === changeDue) {
    changeDueEl.textContent = "Status: CLOSED " + formatChange(changeArray);
    return;
  }

  changeDueEl.textContent = "Status: OPEN " + formatChange(changeArray);
});

// Helper function to format the change string
function formatChange(arr) {
  return arr
    .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
    .join(" ");
}
