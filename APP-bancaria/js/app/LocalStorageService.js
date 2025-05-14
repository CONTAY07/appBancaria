import { Account } from './Account.js';

export class Storage {
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        const item = localStorage.getItem(key);
        if (item) {
            const parsedItem = JSON.parse(item);
            if (key === 'users' && Array.isArray(parsedItem)) {
                // Si la clave es 'users', deserializa cada usuario y su cuenta
                return parsedItem.map(user => {
                    user.account = Account.fromJSON(user.account);
                    return user;
                });
            }
            return parsedItem;
        }
        return null;
    }

    static delete(key) {
        localStorage.removeItem(key);
    }
}