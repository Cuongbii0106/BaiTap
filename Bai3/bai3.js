const employees = [
      { name: "Nguyen Van A", age: 25, department: "IT", email: "a.nguyen@example.com" },
      { name: "Tran Thi B", age: 30, department: "HR", email: "b.tran@example.com" },
      { name: "Le Van C", age: 22, department: "Marketing", email: "c.le@example.com" },
      { name: "Pham Thi D", age: 28, department: "Finance", email: "d.pham@example.com" },
      { name: "Hoang Van E", age: 35, department: "IT", email: "e.hoang@example.com" }
    ];
const tableBody = document.querySelector("#employeeTable tbody");
    const searchBox = document.getElementById("searchBox");

    let currentSort = { column: null, asc: true };

    
    function renderTable(data) {
      tableBody.innerHTML = "";
      data.forEach(emp => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${emp.name}</td>
          <td>${emp.age}</td>
          <td>${emp.department}</td>
          <td>${emp.email}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    
    function filterData() {
      const keyword = searchBox.value.toLowerCase();
      const filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(keyword) ||
        emp.email.toLowerCase().includes(keyword)
      );
      renderTable(filtered);
    }

    
    function sortData(column) {
      if (currentSort.column === column) {
        currentSort.asc = !currentSort.asc; 
      } else {
        currentSort.column = column;
        currentSort.asc = true;
      }

      employees.sort((a, b) => {
        if (a[column] < b[column]) return currentSort.asc ? -1 : 1;
        if (a[column] > b[column]) return currentSort.asc ? 1 : -1;
        return 0;
      });

      filterData(); 
    }


    searchBox.addEventListener("input", filterData);
    document.querySelectorAll("#employeeTable th").forEach(th => {
      th.addEventListener("click", () => sortData(th.dataset.column));
    });


    renderTable(employees);