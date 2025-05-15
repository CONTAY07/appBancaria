import { Transaction } from '../app/transaction.js';

export class ExtractGenerator {
    static generateExtract(transactionList, startDate, endDate) {
        const extract = transactionList.filter(transaction => {
            const transactionDate = transaction.date;
            return transactionDate >= startDate && transactionDate <= endDate;
        });

        return extract;
    };
};
