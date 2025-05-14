import { Account } from './Account.js';

export class User {
    constructor(name, email, phone, password) {
        this.id = Date.now().toString(); // ID único para el usuario
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.account = new Account(this.id); // Inicializa la propiedad account con una instancia de Account
    }
}