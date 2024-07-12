type Expense = {
  description: string;
  amount: number;
  date: Date;
};

class ExpenseTracker {
  private expenses: Expense[] = [];

  addExpense(description: string, amount: number, date: Date): void {
    const expense: Expense = { description, amount, date };
    this.expenses.push(expense);
  }

  viewExpenses(): void {
    console.log('\nExpenses:');
    this.expenses.forEach((expense) => {
      console.log(
        `Description: ${expense.description}, Amount: ${
          expense.amount
        }, Date: ${expense.date.toDateString()}`
      );
    });
    console.log('\n');
  }

  getTotalExpense(): number {
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

  readline.question('Choose an option: ', (option: string) => {
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
  readline.question(
    'Enter the expense description: ',
    (description: string) => {
      readline.question('Enter the expense amount: ', (amount: string) => {
        readline.question('Enter the date (YYYY-MM-DD): ', (date: string) => {
          tracker.addExpense(description, parseFloat(amount), new Date(date));
          console.log('Expense added successfully!\n');
          mainMenu();
        });
      });
    }
  );
}

mainMenu();
