import { Storage } from './LocalStorageService.js';

export class Auth {
    static login(email, password) {
        const users = Storage.get('users') || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return null;
        }
        return user;
    }
}