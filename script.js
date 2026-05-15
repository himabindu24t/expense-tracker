let expenses = [];

const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const noteInput = document.getElementById('note');
const addBtn = document.getElementById('add-btn');
const expenseBody = document.getElementById('expense-body');
const totalSpan = document.getElementById('total');

addBtn.addEventListener('click', addExpense);
function addExpense() {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;
  const note = noteInput.value;

  if (isNaN(amount) || amount <= 0 || !category || !date) {
    alert('Please enter valid amount, category, and date.');
    return;
  }

  const expense = {
    id: Date.now(),
    amount,
    category,
    date,
    note
  };

  expenses.push(expense);
  renderExpenses();
  updateTotal();
  saveExpenses();

  amountInput.value = '';
  categoryInput.value = '';
  dateInput.value = '';
  noteInput.value = '';
}
function renderExpenses() {
  expenseBody.innerHTML = '';

  expenses.forEach(expense => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td>${expense.note || ''}</td>
      <td><button onclick="deleteExpense(${expense.id})">Delete</button></td>
    `;

    expenseBody.appendChild(tr);
  });
}
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  renderExpenses();
  updateTotal();
  saveExpenses();
}
function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalSpan.textContent = total.toFixed(2);
}
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
  const data = localStorage.getItem('expenses');
  if (data) {
    expenses = JSON.parse(data);
    renderExpenses();
    updateTotal();
  }
}

loadExpenses();
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
  const data = localStorage.getItem('expenses');
  if (data) {
    expenses = JSON.parse(data);
    renderExpenses();
    updateTotal();
  }
}

loadExpenses();

