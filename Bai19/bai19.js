let chart; 


fetch("bai19.json")
  .then(res => res.json())
  .then(data => {
    initChart("bar", data);

    const select = document.getElementById("chartType");
    select.addEventListener("change", () => {
      initChart(select.value, data);
    });
  })
  .catch(err => console.error("Lỗi load data.json:", err));

// hàm chart
function initChart(type, data) {
  const ctx = document.getElementById("myChart").getContext("2d");

  if (chart) chart.destroy(); 

  chart = new Chart(ctx, {
    type: type,
    data: {
      labels: data.labels,
      datasets: [{
        label: "Doanh số (triệu VND)",
        data: data.values,
        backgroundColor: [
          "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"
        ],
        borderColor: "#333",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: "easeOutBounce"
      },
      plugins: {
        legend: {
          display: type === "pie" 
        }
      },
      scales: type === "pie" ? {} : {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
