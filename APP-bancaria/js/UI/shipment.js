import { App } from "../app/App.js";
import { Storage } from "../app/LocalStorageService.js";
import { backToTheDashboard, validateAmount, showError, clearErrors, validatePhone } from "../UI/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    // Botón para volver al dashboard
    const backButton = document.querySelector(".back-button");
    backToTheDashboard(backButton);

    // Obtiene la información del usuario actual y su balance
    const userInfrormation = Storage.get("currentUser");
    const userBalance = userInfrormation.account.balance;

    // Muestra el balance del usuario en la interfaz
    const userBalanceContainer = document.querySelector(".balance");
    userBalanceContainer.textContent = `$ ${userBalance.toFixed(2).replace(".", ",")}`;

    // Maneja la selección de pestañas para tipos de envío
    const optionsShiment = document.querySelectorAll(".tab-button");
    optionsShiment.forEach((option) => {
        option.addEventListener("click", () => {
            optionsShiment.forEach((opt) => {
                opt.classList.remove("active");
            });
            option.classList.add("active");
        });
    });

    // Elementos del formulario de envío
    const shipmentForm = document.getElementById("form");
    const amountInput = document.getElementById("amount");
    const recipientInput = document.getElementById("recipient");

    // Maneja el envío del formulario de retiro/envío de dinero
    shipmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        clearErrors();
        let amount = parseFloat(amountInput.value);
        let recipient = recipientInput.value.trim();

        // Validaciones de los campos
        const recipientError = validatePhone(recipient);
        const amountError = validateAmount(amount, userBalance);
        if (!amountError) {
            showError("amount", "La cantidad no es válida");
            return;
        }
        if (!recipientError) {
            showError("recipient", "El número de cuenta no es válido");
            return;
        }

        // Agrega la transacción y recarga la página
        App.addTransaction(userInfrormation, amount, "Retiro", "Retiro de dinero");
        alert(`El usuario ${userInfrormation.name} ha enviado $${amount} pesos exitosamente a ${recipient}`);
        window.location.reload();
    });
});