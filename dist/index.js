"use strict";
class ExpenseTracker {
    constructor() {
        this.expenses = [];
    }
    addExpense(description, amount, date) {
        const expense = { description, amount, date };
        this.expenses.push(expense);
    }
    viewExpenses() {
        console.log('\nExpenses:');
        this.expenses.forEach((expense) => {
            console.log(`Description: ${expense.description}, Amount: ${expense.amount}, Date: ${expense.date.toDateString()}`);
        });
        console.log('\n');
    }
    getTotalExpense() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }
}
// Example usage
const tracker = new ExpenseTracker();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
function mainMenu() {
    console.log('\n1. Add Expense');
    console.log('2. View Expenses');
    console.log('3. Calculate Total');
    console.log('4. Exit');
    readline.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                addExpenseMenu();
                break;
            case '2':
                tracker.viewExpenses();
                mainMenu();
                break;
            case '3':
                console.log(`Total Expense: ${tracker.getTotalExpense()}\n`);
                mainMenu();
                break;
            case '4':
                readline.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
                break;
        }
    });
}
function addExpenseMenu() {
    readline.question('Enter the expense description: ', (description) => {
        readline.question('Enter the expense amount: ', (amount) => {
            readline.question('Enter the date (YYYY-MM-DD): ', (date) => {
                tracker.addExpense(description, parseFloat(amount), new Date(date));
                console.log('Expense added successfully!\n');
                mainMenu();
            });
        });
    });
}
mainMenu();
