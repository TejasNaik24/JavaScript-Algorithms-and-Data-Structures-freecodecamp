document.getElementById("convert-btn").addEventListener("click", function () {
  const number = parseInt(document.getElementById("number").value);
  const output = document.getElementById("output");

  // Check if the input is a valid number
  if (isNaN(number)) {
    output.textContent = "Please enter a valid number";
    return;
  }

  // Check if the number is less than 1
  if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  // Check if the number is 4000 or more
  if (number >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }

  // Convert number to Roman numeral
  output.textContent = arabicToRoman(number);
});

// Roman numeral conversion function
function arabicToRoman(num) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";

  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      result += numeral.symbol;
      num -= numeral.value;
    }
  }

  return result;
}
