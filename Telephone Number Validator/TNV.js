const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");

checkBtn.addEventListener("click", () => {
  const number = userInput.value.trim();

  if (number === "") {
    alert("Please provide a phone number");
    return;
  }

  const isValid = validatePhoneNumber(number);
  resultsDiv.textContent = `${
    isValid ? "Valid" : "Invalid"
  } US number: ${number}`;
});

clearBtn.addEventListener("click", () => {
  userInput.value = "";
  resultsDiv.textContent = "";
});

function validatePhoneNumber(number) {
  // Check for balanced parentheses
  if (
    (number.match(/\(/g) || []).length !== (number.match(/\)/g) || []).length
  ) {
    return false;
  }

  // Check if parentheses are used correctly around area code only
  if (number.includes("(") || number.includes(")")) {
    if (!/\(\d{3}\)/.test(number)) {
      return false;
    }
  }

  // Regex for valid US phone number formats
  const validPattern = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

  // Remove non-digit characters for validation
  const digitsOnly = number.replace(/\D/g, "");

  // Check digit count (10 digits, or 11 with leading 1)
  if (digitsOnly.length === 11 && digitsOnly[0] !== "1") return false;
  if (digitsOnly.length < 10 || digitsOnly.length > 11) return false;

  return validPattern.test(number);
}
