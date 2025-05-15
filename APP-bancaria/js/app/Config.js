import { Storage } from './LocalStorageService.js'; // Importa el servicio de almacenamiento local

// Clase para actualizar la configuración del usuario
export class Config {
    // Actualiza el nombre del usuario
    static updateName(userId, newName) {
        const users = Storage.get('users') || []; // Obtiene la lista de usuarios
        const userIndex = users.findIndex(user => user.id === userId); // Busca el usuario por ID

        if (userIndex !== -1) {
            users[userIndex].name = newName; // Actualiza el nombre
            Storage.save('users', users); // Guarda la lista actualizada
            alert(`Nombre del usuario ${userId} actualizado a ${newName}`);

            // Si el usuario actualizado es el actual, actualiza también el currentUser
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.name = newName;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }

    // Actualiza el correo electrónico del usuario
    static updateEmail(userId, newEmail) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].email = newEmail;
            Storage.save('users', users);
            alert(`Correo del usuario ${userId} actualizado a ${newEmail}`);

            // Si el usuario actualizado es el actual, actualiza también el currentUser
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.email = newEmail;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }

    // Actualiza el teléfono del usuario
    static updatePhone(userId, newPhone) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].phone = newPhone;
            Storage.save('users', users);
            alert(`Teléfono del usuario ${userId} actualizado a ${newPhone}`);

            // Si el usuario actualizado es el actual, actualiza también el currentUser
            const currentUser = Storage.get('currentUser');
            if (currentUser && currentUser.id === userId) {
                currentUser.phone = newPhone;
                Storage.save('currentUser', currentUser);
            }
        } else {
            alert(`No se encontró el usuario con el ID ${userId}`);
        }
    }

    // Actualiza la contraseña del usuario
    static updatePassword(userId, newPassword) {
        const users = Storage.get('users') || [];
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            Storage.save('users', users);
            alert(`Contraseña del usuario ${userId} actualizada`);

            // Si el usuario actualizado es el actual, actualiza también el currentUser
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