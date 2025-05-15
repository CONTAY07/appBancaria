import { Account } from './Account.js';

// Clase para manejar el almacenamiento local
export class Storage {
    // Guarda un valor con una clave en localStorage
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Obtiene un valor por clave desde localStorage
    static get(key) {
        const item = localStorage.getItem(key);
        if (item) {
            const parsedItem = JSON.parse(item);
            // Si la clave es 'users', deserializa cada usuario y su cuenta
            if (key === 'users' && Array.isArray(parsedItem)) {
                return parsedItem.map(user => {
                    user.account = Account.fromJSON(user.account); // Reconstruye la cuenta como instancia de Account
                    return user;
                });
            }
            return parsedItem; // Retorna el valor parseado normalmente
        }
        return null; // Si no existe, retorna null
    }

    // Elimina un valor por clave de localStorage
    static delete(key) {
        localStorage.removeItem(key);
    }
}