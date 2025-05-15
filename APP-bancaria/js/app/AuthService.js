import { Storage } from './LocalStorageService.js'; // Importa el servicio de almacenamiento local

// Clase para autenticación de usuarios
export class Auth {
    // Método estático para iniciar sesión
    static login(email, password) {
        const users = Storage.get('users') || []; // Obtiene la lista de usuarios del almacenamiento local
        // Busca un usuario que coincida con el email y la contraseña
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return null; // Si no encuentra el usuario, retorna null
        }
        return user; // Si encuentra el usuario, lo retorna
    }
}