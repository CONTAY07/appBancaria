// Valida que el nombre solo contenga letras y espacios
export function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
    return nameRegex.test(name);
}

// Valida el formato de un correo electrónico
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Valida que el teléfono tenga entre 7 y 15 dígitos
export function validatePhone(phone) {
    const phoneRegex = /^\d{7,15}$/; // Entre 7 y 15 dígitos
    return phoneRegex.test(phone);
}

// Valida que la contraseña tenga al menos 8 caracteres
export function validatePassword(password) {
    return password.length >= 8;
}

// Función para mostrar mensajes de error en el formulario
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

// Elimina todos los mensajes de error del formulario
export function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}

// Valida la cantidad de dinero ingresada
export function validateAmount(amount, balance) {
    const amountRegex = /^\d+(\.\d{1,2})?$/; // Solo números y hasta 2 decimales
    const validacionDecimales = amountRegex.test(amount);

    if (!validacionDecimales || amount > balance || amount <= 0 || amount === '') {
        return false;
    }

    return true;
}

// Redirige al dashboard al hacer click en el elemento recibido
export function backToTheDashboard(elemento) {
    elemento.addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    })
}

// Muestra una lista de transacciones en el DOM
export function showTransactionlist(list) {
    const transactionList = document.querySelector(".list");
    transactionList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

    let documentFragment = document.createDocumentFragment();

    list.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('item');
        transactionItem.innerHTML = `
            <div class="details">
                <p class= "date">${transaction.date}</p>
                <p class= "description">${transaction.description}</p>
            </div>
            <p class= "amount"> $${transaction.amount}</p>
        `;
        documentFragment.appendChild(transactionItem);
    });

    transactionList.appendChild(documentFragment);
}