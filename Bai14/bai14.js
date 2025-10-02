let employees = []
const tableBody = document.querySelector("#employeeTable tbody")


fetch("bai14.json")
  .then(res => res.json())
  .then(data => {
    employees = data
    renderTable()
  })

function renderTable() {
  tableBody.innerHTML = ""
  employees.forEach((emp, rowIndex) => {
    const row = document.createElement("tr")
    Object.keys(emp).forEach(key => {
      const cell = document.createElement("td")
      cell.textContent = emp[key]
      cell.addEventListener("click", () => enableEditing(cell, rowIndex, key))
      row.appendChild(cell)
    })
    tableBody.appendChild(row)
  })
}

function enableEditing(cell, rowIndex, key) {
  if (cell.classList.contains("editing")) return

  const oldValue = cell.textContent
  cell.classList.add("editing")

  const input = document.createElement("input")
  input.type = "text"
  input.value = oldValue
  input.className = "inline-input"

  cell.textContent = ""
  cell.appendChild(input)
  input.focus()

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      employees[rowIndex][key] = input.value.trim()
      renderTable()
    } else if (e.key === "Escape") {
      cell.textContent = oldValue
      cell.classList.remove("editing")
    }
  })

  input.addEventListener("blur", () => {
    cell.textContent = oldValue
    cell.classList.remove("editing")
  })
}
