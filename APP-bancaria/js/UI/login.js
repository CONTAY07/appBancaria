import { App } from "../app/App.js";

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Captura los valores de los campos del formulario
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Limpia los mensajes de error anteriores
        clearErrors();

        // Llama a la función App.loginUser para iniciar sesión
        const user = App.loginUser(email, password);

        if (user) {
            // Inicio de sesión exitoso
            // Guarda la información del usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Redirige al usuario al dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Inicio de sesión fallido
            showError('password', 'Credenciales incorrectas.');
        }
    });

    // Función para mostrar mensajes de error
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpanId = fieldId + '-error';
        let errorSpan = document.getElementById(errorSpanId);

        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.id = errorSpanId;
            errorSpan.className = 'error-message';
            field.parentNode.appendChild(errorSpan);
        }

        errorSpan.textContent = message;
        errorSpan.style.color = 'red';
    }

    // Función para limpiar los mensajes de error
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    }
});