const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

const isPalindrome = (str) => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/gi, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
};

button.addEventListener("click", () => {
  const inputValue = input.value;

  if (!inputValue) {
    alert("Please input a value");
    return;
  }

  const palindromeCheck = isPalindrome(inputValue);

  if (palindromeCheck) {
    result.textContent = `${inputValue} is a palindrome.`;
  } else {
    result.textContent = `${inputValue} is not a palindrome.`;
  }
});
