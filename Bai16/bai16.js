const daysEl = document.getElementById("days");
const monthYearEl = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const tooltip = document.getElementById("tooltip");

let currentDate = new Date();
let events = {}; 

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYearEl.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });


  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  daysEl.innerHTML = "";

  // Them cac o trong truoc ngay dau tien cua thang
  for (let i = 0; i < firstDay; i++) {
    daysEl.innerHTML += `<div></div>`;
  }

  // Ve cac ngay trong thang
  for (let day = 1; day <= lastDate; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const div = document.createElement("div");
    div.textContent = day;

    // Danh dau ngay hom nay
    const today = new Date();
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      div.classList.add("today");
    }

    // Danh dau ngay co su kien
    if (events[dateStr]) {
      div.classList.add("event");
    }

    // Khi click vao ngay → them hoac sua su kien
    div.addEventListener("click", () => {
      const event = prompt("Nhap su kien cho ngay " + dateStr, events[dateStr] || "");
      if (event) {
        events[dateStr] = event;
      } else {
        delete events[dateStr];
      }
      renderCalendar();
    });

    // Khi di chuot qua ngay co su kien → hien tooltip
    div.addEventListener("mouseover", (e) => {
      if (events[dateStr]) {
        tooltip.textContent = events[dateStr];
        tooltip.style.display = "block";
        tooltip.style.top = (e.pageY - 40) + "px";
        tooltip.style.left = (e.pageX + 10) + "px";
      }
    });

    // Khi di chuyen cap nhat vi tri tooltip
    div.addEventListener("mousemove", (e) => {
      if (events[dateStr]) {
        tooltip.style.top = (e.pageY - 40) + "px";
        tooltip.style.left = (e.pageX + 10) + "px";
      }
    });

    // Khi roi chuot khoi ngay → an tooltip
    div.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });

    daysEl.appendChild(div);
  }
}

// Chuyen sang thang truoc
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

// chuyen thang 
nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});


renderCalendar();
