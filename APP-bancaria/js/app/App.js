import { User } from './User.js';
import { Auth } from './AuthService.js';
import { Storage } from './LocalStorageService.js';

export class App {
    static init() {
        console.log("Aplicación inicializada.");
    };

    static registerUser(name, email, phone, password) {
        const user = new User(name, email, phone, password);

        const users = Storage.get('users') || [];
        users.push(user);

        Storage.save('users', users);
        console.log(`Usuario ${name} registrado con la cuenta ${user.account.accountNumber}.`);
    };

    static loginUser(email, password) {
        return Auth.login(email, password);
    };

    static addTransaction(user, amount, type, description) {
        user.account.addTransaction(amount, type, description);
        Storage.save('users', Storage.get('users').map(u => u.id === user.id ? user : u));
    };

    static applyDailyInterest(user) {
        user.account.applyDailyInterest();
        Storage.save('users', Storage.get('users').map(u => u.id === user.id ? user : u));
    };
};