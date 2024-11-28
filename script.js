document.addEventListener('DOMContentLoaded', () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || []
    const expense_name = document.getElementById('expense_name')
    const expense_price = document.getElementById('expense_price')
    const submit_btn = document.getElementById('submit')
    const expense_list = document.getElementById("expense_list")

    submit_btn.addEventListener('click', (e) => {
        e.preventDefault()
        const expense = {
            "expense_name": expense_name.value,
            "expense_price": expense_price.value
        }
        expenses.push(expense)
        // console.log(expenses); 
        expense_name.value = ""
        expense_price.value = ""

        renderCart()
        save_to_localStorage()
    })

    function renderCart(){
        expense_list.innerHTML = " "
        expenses.forEach((exp, index) => {
            const ul = document.createElement("ul")
            const li = document.createElement("li")
            li.innerHTML = `<h5>${exp.expense_name} -- ₹${exp.expense_price} <button data-index = ${index} class="delete_exp_btn">Delete</button></h5>`
            ul.appendChild(li)
            expense_list.appendChild(ul)
        })
        const delete_buttons = document.querySelectorAll('.delete_exp_btn')
        delete_buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index')
                delete_expenses(index)
            })
        });
    }

    function save_to_localStorage(){
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    function delete_expenses(index){
        expenses.splice(index, 1)
        renderCart()
        save_to_localStorage()
    }
    renderCart()
})