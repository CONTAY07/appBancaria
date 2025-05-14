export class Transaction{
    constructor(amount, type, description){
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.date = new Date();
    };
}