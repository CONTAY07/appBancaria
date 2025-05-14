import { Transaction } from './transaction.js';
import { InterestCalculator } from './interestCalculator.js';

export class Account {
    constructor(userId) {
        this.accountNumber = `ACC-${Date.now()}`; // Número de cuenta único
        this.userId = userId; // ID del usuario al que pertenece la cuenta
        this.balance = 0;
        this.transactions = []; // Lista de transacciones
    }

    addTransaction(amount, type, description) {
        const transaction = new Transaction(amount, type, description);
        this.transactions.push(transaction);
        this.balance += amount;
        console.log(`Transacción de ${amount} (${type}) realizada. Nuevo saldo: ${this.balance}`);
    }

    applyDailyInterest() {
        const interest = InterestCalculator.calculateDaily(this.balance);
        this.balance += interest;
        console.log(`Interés diario aplicado: ${interest}. Nuevo saldo: ${this.balance}`);
    }

    getTransactions() {
        return this.transactions;
    }

    // Método para serializar la clase Account a JSON
    toJSON() {
        return {
            accountNumber: this.accountNumber,
            userId: this.userId,
            balance: this.balance,
            transactions: this.transactions
        };
    }

    // Método para deserializar la clase Account desde JSON
    static fromJSON(json) {
        const account = new Account(json.userId);
        account.accountNumber = json.accountNumber;
        account.balance = json.balance;
        account.transactions = json.transactions;
        return account;
    }
}