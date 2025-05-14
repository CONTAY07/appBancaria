import { App } from '../app/App.js';
import { validateName, validateEmail, validatePhone, validatePassword, clearErrors, showError } from "../UI/utils.js";


document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registro-form');

    registroForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Captura los valores de los campos del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();

        // Limpia los mensajes de error anteriores
        clearErrors();

        // Validaciones
        let isValid = true;

        if (!validateName(name)) {
            showError('name', 'El nombre no debe contener números ni caracteres especiales.');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('email', 'Por favor, introduce un correo electrónico válido.');
            isValid = false;
        }

        if (!validatePhone(phone)) {
            showError('phone', 'Por favor, introduce un número de teléfono válido.');
            isValid = false;
        }

        if (!validatePassword(password)) {
            showError('password', 'La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        }

        if (!isValid) {
            return; // Detiene el proceso si hay errores
        }

        // Llama a la función App.registerUser para registrar al usuario
        App.registerUser(name, email, phone, password);

        // Muestra un mensaje de éxito
        alert('Registro exitoso. Redirigiendo al inicio de sesión.');

        // Redirige al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    });
});