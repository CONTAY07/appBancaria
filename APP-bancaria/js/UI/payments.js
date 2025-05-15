import { App } from "../app/App.js";
import { Storage } from "../app/LocalStorageService.js";
import { backToTheDashboard, showError, clearErrors, showTransactionlist, validatePhone, validateAmount } from "../UI/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-button");
    backToTheDashboard(backButton); // Asigna la funcionalidad para volver al dashboard

    const userInfrormation = Storage.get("currentUser");
    const userBalance = userInfrormation.account.balance;

    // Muestra el balance del usuario en la interfaz
    const userBalanceContainer = document.querySelector(".balance");
    userBalanceContainer.textContent = `$ ${userBalance}`;

    // Botón para mostrar el formulario de nuevo pago
    const newPayButton = document.querySelector(".new-payment");
    const paymentForm = document.querySelector(".form-container");

    newPayButton.addEventListener("click", () => {
        paymentForm.style.display = "block";
    });

    // Elementos del formulario de pago
    const newPayForm = document.getElementById("form");
    const cancelRefillButton = document.getElementById("cancelButton");
    const amountInput = document.getElementById("amount");
    const recipientInput = document.getElementById("recipient");

    // Maneja el envío del formulario de pago
    newPayForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let amount = parseFloat(amountInput.value);
        let recipient = recipientInput.value;

        clearErrors();

        // Validaciones de los campos
        const recipientError = validatePhone(recipient);
        const amountError = validateAmount(amount, userBalance);
        if (!amountError) {
            showError("amount", "La cantidad no es válida");
            return;
        }
        if (!recipientError) {
            showError("recipient", "El número de referencia no es válido");
            return;
        }

        // Agrega la transacción y recarga la página
        App.addTransaction(userInfrormation, amount, "Retiro", "Pago de factura");
        alert("pago realizado exitosamente");
        window.location.reload();
    });

    // Botón para cancelar el formulario de pago
    cancelRefillButton.addEventListener("click", () => {
        paymentForm.style.display = "none";
        amountInput.value = "";
        recipientInput.value = "";
    });

    // Filtra y muestra solo las transacciones de tipo "Pago de factura"
    const ListTransactionParcial = userInfrormation.account.transactions;
    const transactionList = ListTransactionParcial.filter((transaction) => {
        return transaction.description === "Pago de factura";
    });

    showTransactionlist(transactionList);
});