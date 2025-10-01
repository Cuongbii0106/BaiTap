let DATA = [] 

const input = document.getElementById("searchInput")
const suggestionsEl = document.getElementById("suggestions")

let activeIndex = -1
let currentResults = []

//load json
fetch("bai20.json")
  .then(res => res.json())
  .then(json => {
    DATA = json
  })
  .catch(err => console.error("Loi load data.json:", err))


function debounce(fn, wait = 250) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

//search
function searchDataset(query) {
  if (!query) return []
  const q = query.trim().toLowerCase()
  const starts = []
  const contains = []
  for (const item of DATA) {
    const s = item.toLowerCase()
    if (s.startsWith(q)) starts.push(item)
    else if (s.includes(q)) contains.push(item)
  }
  return starts.concat(contains).slice(0, 20)
}

//render
function renderSuggestions(list, query) {
  suggestionsEl.innerHTML = ""
  activeIndex = -1
  currentResults = list

  if (!list.length) {
    suggestionsEl.classList.remove("show")
    return
  }

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const li = document.createElement("li")
    li.setAttribute("role", "option")
    li.dataset.index = i

    const idx = item.toLowerCase().indexOf(query.toLowerCase())
    if (idx >= 0) {
      const before = item.slice(0, idx)
      const match = item.slice(idx, idx + query.length)
      const after = item.slice(idx + query.length)
      li.innerHTML = `<span>${escapeHtml(before)}<span class="match">${escapeHtml(match)}</span>${escapeHtml(after)}</span>`
    } else {
      li.textContent = item
    }

    const sub = document.createElement("span")
    sub.className = "sub"
    sub.textContent = `${item.length} chars`
    li.appendChild(sub)

    li.addEventListener("click", () => {
      selectSuggestion(i)
    })

    suggestionsEl.appendChild(li)
  }

  suggestionsEl.classList.add("show")
}


function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ))
}

//chon goi y
function selectSuggestion(index) {
  const value = currentResults[index]
  if (!value) return
  input.value = value
  clearSuggestions()
  input.focus()
  console.log("Da chon:", value)
}

// xoa danh sach goi y
function clearSuggestions() {
  suggestionsEl.innerHTML = ""
  suggestionsEl.classList.remove("show")
  currentResults = []
  activeIndex = -1
}

//dieu huong bang phim 
function setActive(index) {
  const items = suggestionsEl.querySelectorAll("li")
  if (!items.length) return
  if (index < 0) index = -1
  if (index >= items.length) index = items.length - 1
  items.forEach(el => el.classList.remove("active"))
  if (index >= 0) {
    items[index].classList.add("active")
    items[index].scrollIntoView({ block: "nearest" })
  }
  activeIndex = index
}

//xu ly khi nhap input
const handleInput = debounce((ev) => {
  const q = ev.target.value
  if (!q) {
    clearSuggestions()
    return
  }
  const results = searchDataset(q)
  renderSuggestions(results, q)
}, 160)

input.addEventListener("input", handleInput)



//an goi y 
document.addEventListener("click", (ev) => {
  if (!ev.target.closest(".search-wrapper")) {
    clearSuggestions()
  }
})
