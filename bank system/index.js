class BankAccount {
    constructor(account_no, account_holder, balance = 0) {
        this.account_no = account_no;
        this.account_holder = account_holder;
        this.balance = balance;
    }

    deposit() {
        const amount = parseFloat(prompt("Enter the amount you want to deposit"));
        if (amount < 0 || isNaN(amount)) {
            console.log("Invalid amount");
        } else {
            this.balance += amount;
            console.log(`Account balance is ${this.balance}`);
        }
    }

    withdraw() {
        const amount = parseFloat(prompt("Enter the amount you want to withdraw"));
        if (amount < 0 || isNaN(amount)) {
            console.log("Invalid withdrawal amount");
        } else if (amount > this.balance) {
            console.log("Insufficient balance");
        } else {
            this.balance -= amount;
            console.log(`Remaining balance is ${this.balance}`);
        }
    }

    displayBalance() {
        console.log(`Account balance is ${this.balance}`);
    }

    addInterest(rate) {
        const interest = this.balance * rate / 100;
        this.balance += interest;
        console.log(`Interest of ${interest} added. New balance is ${this.balance}`);
    }
}

class SavingAccount extends BankAccount {
    withdraw() {
        const amount = parseFloat(prompt("Enter the amount you want to withdraw"));
        const withdrawalLimit = 1000;
        const penaltyFee = 10;
        if (amount > withdrawalLimit) {
            console.log("Withdrawal amount exceeds limit. Penalty fee will be applied.");
            this.balance -= (amount + penaltyFee);
            console.log(`Penalty fee of ${penaltyFee} applied. Remaining balance is ${this.balance}`);
        } else {
            super.withdraw(amount);
        }
    }
}

function choice(account) {
    do {
        const choice = parseInt(prompt("Enter the choice: \n1. Deposit\n2. Withdraw\n3. Check Balance\n4. Check Interest\n5. Exit"));
        switch (choice) {
            case 1:
                account.deposit();
                break;
            case 2:
                account.withdraw();
                break;
            case 3:
                account.displayBalance();
                break;
            case 4:
                account.addInterest(3.5);
                break;
            case 5:
                return;
            default:
                console.log("Invalid choice");
        }
    } while (true);
}

const option = prompt("Enter the choice:\n1. Bank Account\n2. Saving Account");

if (option === "1") {
    const account1 = new BankAccount("123456789", "John Doe");
    choice(account1);
} else if (option === "2") {
    const account2 = new SavingAccount("987654321", "Jane Doe");
    choice(account2);
} else {
    console.log("Invalid option");
}


