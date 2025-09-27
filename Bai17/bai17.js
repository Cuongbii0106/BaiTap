const lengthEl = document.getElementById("length")
const uppercaseEl = document.getElementById("uppercase")
const lowercaseEl = document.getElementById("lowercase")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const generateBtn = document.getElementById("generate")
const passwordEl = document.getElementById("password")
const copyBtn = document.getElementById("copy")

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerChars = "abcdefghijklmnopqrstuvwxyz"
const numberChars = "0123456789"
const symbolChars = "!@#$%^&*()_+{}[]<>?."

function generatePassword() {
  const length = +lengthEl.value
  let chars = ""

  if (uppercaseEl.checked) chars += upperChars
  if (lowercaseEl.checked) chars += lowerChars
  if (numbersEl.checked) chars += numberChars
  if (symbolsEl.checked) chars += symbolChars

  if (chars === "") {
    alert("Vui lòng chọn ít nhất một tùy chọn!")
    return ""
  }

  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars[randomIndex]
  }
  return password
}

generateBtn.addEventListener("click", () => {
  const pw = generatePassword()
  passwordEl.value = pw
})

copyBtn.addEventListener("click", () => {
  if (passwordEl.value) {
    navigator.clipboard.writeText(passwordEl.value).then(() => {
      alert("Đã copy mật khẩu!")
    })
  }
})
