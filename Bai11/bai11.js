document.addEventListener('DOMContentLoaded', () => {
    const itemPage = 10
    let currentPage = 1

    //hàm làm tròn tiền
    function randomPrice() {
        const raw = Math.random() * 10000
        return Math.round(raw / 500) * 500
    }
    const numberFormat = new Intl.NumberFormat('vi-VN');

    function formatPrice(v) {
        return numberFormat.format(v) + ' VNĐ';
    }


    //tao du lieu gia
    const products = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Sản Phẩm ${i + 1}`,
        price: randomPrice()
    }))

    const totalPages = Math.ceil(products.length / itemPage)

    const tbody = document.getElementById('table-body')
    const pageNumEl = document.getElementById('pageNum')
    const totalPagesEl = document.getElementById('totalPages')
    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')
    const jumpInput = document.getElementById('jumpInput')
    const jumpBtn = document.getElementById('jumpBtn')

    totalPagesEl.textContent = totalPages;

    function renderTable() {
        tbody.innerHTML = ''
        const start = (currentPage - 1) * itemPage
        const end = start + itemPage
        const pageData = products.slice(start, end)

        const frag = document.createDocumentFragment();

        pageData.forEach(p => {
            const tr = document.createElement('tr')
            const tdId = document.createElement('td')
            tdId.textContent = p.id
            tr.appendChild(tdId)

            const tdName = document.createElement('td')
            tdName.textContent = p.name;
            tr.appendChild(tdName)

            const tdPrice = document.createElement('td')
            tdPrice.textContent = formatPrice(p.price)
            tr.appendChild(tdPrice)

            frag.appendChild(tr)

        })
        tbody.appendChild(frag)

        pageNumEl.textContent = currentPage

        prevBtn.disabled = (currentPage === 1)
        nextBtn.disabled = (currentPage === totalPages)
    }

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++
            renderTable()
        }
    })

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--
            renderTable()
        }
    })

    jumpBtn.addEventListener('click', ()=>{
        const inputPage = parseInt(jumpInput.value, 10)
        if (!Number.isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
            currentPage = inputPage
            renderTable()
        } else {
            alert('Trang error')
        }
    })

    jumpInput.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            jumpBtn.click();
        }
    })

    renderTable()
})