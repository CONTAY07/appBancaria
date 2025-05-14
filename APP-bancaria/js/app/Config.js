import { Storage } from './LocalStorageService.js';

export class Config {
    static updateName(userId, newName) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].name = newName;
            Storage.save('users', users);
            alert(`Nombre del usuario ${userId} actualizado a ${newName}`);

            // Actualiza el currentUser si es el mismo usuario
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.name = newName;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }

    static updateEmail(userId, newEmail) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].email = newEmail;
            Storage.save('users', users);
            alert(`Correo del usuario ${userId} actualizado a ${newEmail}`);

            // Actualiza el currentUser si es el mismo usuario
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.email = newEmail;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }

    static updatePhone(userId, newPhone) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].phone = newPhone;
            Storage.save('users', users);
            alert(`Teléfono del usuario ${userId} actualizado a ${newPhone}`);

            // Actualiza el currentUser si es el mismo usuario
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.phone = newPhone;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }

    static updatePassword(userId, newPassword) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            Storage.save('users', users);
            alert(`Contraseña del usuario ${userId} actualizada`);

            // Actualiza el currentUser si es el mismo usuario
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.password = newPassword;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }
}