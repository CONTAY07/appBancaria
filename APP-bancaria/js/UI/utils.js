export function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
        return nameRegex.test(name);
    }

    export function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    export function validatePhone(phone) {
        const phoneRegex = /^\d{7,15}$/; // Entre 7 y 15 dígitos
        return phoneRegex.test(phone);
    }

    export function validatePassword(password) {
        return password.length >= 8;
    }

    // Función para mostrar mensajes de error
    export function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpanId = fieldId + '-error';
        let errorSpan = document.getElementById(errorSpanId);

        if (!errorSpan) {
            errorSpan = document.createElement('span')
            errorSpan.id = errorSpanId;
            errorSpan.className = 'error-message';
            field.parentNode.appendChild(errorSpan);
        }

        errorSpan.textContent = message;
        errorSpan.style.color = 'red';
    }

    // Función para limpiar los mensajes de error
    export function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    }

function backToTheDashboard(elemento) {
    elemento.addeventListener('click', function() {
        window.location.href = 'dashboard.html';
    })
}