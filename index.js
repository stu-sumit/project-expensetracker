// Selecting DOM elements for income tracker
const income_description = document.getElementById("income-description");
const income_amount = document.getElementById("income-amount");
const income_button = document.getElementById("income-button");

const income_table = document.getElementById("income-table");
const income_tablebody = document.getElementById("income-table-body");
const totalIncomeElement = document.getElementById("totalIncome"); 

let income = [];
let totalExpense = 0;
let totalIncome  = 0;
let balance = 0;

window.addEventListener('load', () => {
    income = JSON.parse(localStorage.getItem('income')) || [];  
    printIncomes();
    updateTotalIncome();
});

income_button.addEventListener('click', () => {
    const obj = {};
    obj.desc = income_description.value;
    obj.amount = income_amount.value;
    
    if (obj.desc && obj.amount) {  // Check if both description and amount are filled out
        // Add the new object to the income array
        income.push(obj);
        
        income_description.value = '';
        income_amount.value = '';
        
        console.log(income);

        localStorage.setItem("income", JSON.stringify(income));

        printIncomes();
        updateTotalIncome(); 
    } else {
        alert("Please enter both description and amount.");
    }
});

// Function to print income data in the table
function printIncomes() {
    let tableRows = '';
    
    income.forEach((item) => {
        tableRows += `
        <tr>
            <td>${item.desc}</td>
            <td>${item.amount}</td>
        </tr>
    `;
    });
    income_tablebody.innerHTML = tableRows;
}

// Function to update total income displayed
function updateTotalIncome() {
     totalIncome = income.reduce((total, incomeItem) => total + parseFloat(incomeItem.amount), 0);
    totalIncomeElement.innerText = totalIncome.toFixed(2); // 
}

// Selecting DOM elements for expense tracker
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategorySelect = document.getElementById("expense-category");
const expenseButton = document.querySelector(".expense-form button");

const expenseTableBody = document.getElementById("expense-table-body");
const totalExpenseElement = document.getElementById("totalExpense"); 
const remainingAmountElement = document.getElementById('remainingAmount');


let expenses = [];


window.addEventListener('load', () => {
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];  
    printExpenses();
    updateTotalExpense(); 
    getRemainingBalance()
    prinitBalance();
});

expenseButton.addEventListener('click', () => {
    if(parseFloat(expenseAmountInput.value.trim()) > balance) {
        alert("You can not expend more than your balance");
        return false
    }
    const expenseObj = {
        name: expenseNameInput.value.trim(),
        amount: parseFloat(expenseAmountInput.value.trim()),
        category: expenseCategorySelect.value
    };
    
    if (expenseObj.name && !isNaN(expenseObj.amount) && expenseObj.amount > 0 && expenseObj.category) {
        expenses.push(expenseObj);
        
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseCategorySelect.value = '';
        
        localStorage.setItem("expenses", JSON.stringify(expenses));
        
        printExpenses();
        updateTotalExpense();
        prinitBalance();
    } else {
        alert("Please enter valid data for all fields.");
    }
});
//function for remaining amount

function getRemainingBalance() {
    balance = totalIncome-totalExpense
}

function prinitBalance(){
    remainingAmountElement.innerHTML = balance
}

// Function to print the expense data in the table
function printExpenses() {
    let tableRows = '';
    expenses.forEach((expense) => {
        tableRows += `
        <tr>
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
        </tr>
    `;
    });

    expenseTableBody.innerHTML = tableRows;
}

function updateTotalExpense() {
     totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0); 
    totalExpenseElement.innerText = totalExpense.toFixed(2); 
}
