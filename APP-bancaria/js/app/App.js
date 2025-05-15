import { User } from './User.js';
import { Auth } from './AuthService.js';
import { Storage } from './LocalStorageService.js';
import { Account } from './Account.js';

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

    static addTransaction(userInfrormation, amount, type, description) {
        // Retrieve the users from local storage
        let users = Storage.get('users') || [];

        // Find the user in the array
        let user = users.find(u => u.account.accountNumber === userInfrormation.account.accountNumber);

        if (user) {
            // Add the transaction to the user's account
            user.account.addTransaction(amount, type, description);

             // Update the user in the array
            users = users.map(u => (u.account.accountNumber === userInfrormation.account.accountNumber ? user : u));

            // Save the updated users array back to local storage
            Storage.save('users', users);

            // Update the currentUser in local storage, if it's the same user
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.account.accountNumber === user.account.accountNumber) {
                Storage.save('currentUser', user);
            }
        } else {
            console.log('User not found');
        }
    };
};