let daysEl = document.getElementById("date");
let hrsEl = document.getElementById("hrs");
let minEl = document.getElementById("min");
let secEl = document.getElementById("sec");
let popup = document.getElementById("popup");

let countdown; // biến lưu setInterval
let targetDate; // biến lưu ngày mục tiêu

// Hàm set ngày mục tiêu từ input
function setTargetDate() {
  let input = document.getElementById("targetInput").value;
  if (!input) {
    alert("Vui lòng chọn ngày giờ!");
    return;
  }
  targetDate = new Date(input).getTime();

  if (countdown) clearInterval(countdown); // reset nếu đã chạy trước đó

  countdown = setInterval(updateCountdown, 1000);
  updateCountdown(); // chạy ngay lập tức
}

// Hàm cập nhật countdown
function updateCountdown() {
  let now = new Date().getTime();
  let distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    daysEl.innerHTML = hrsEl.innerHTML = minEl.innerHTML = secEl.innerHTML = "00";
    popup.style.display = "flex";
    return;
  }

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.innerHTML = days < 10 ? "0" + days : days;
  hrsEl.innerHTML = hours < 10 ? "0" + hours : hours;
  minEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  secEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

// Đóng popup
function closePopup() {
  popup.style.display = "none";
}
