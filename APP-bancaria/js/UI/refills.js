import { App } from "../app/App.js";
import { Storage } from "../app/LocalStorageService.js";
import { backToTheDashboard, showError, clearErrors, showTransactionlist } from "../UI/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-button");
    backToTheDashboard(backButton); // Asigna la funcionalidad para volver al dashboard

    const userInfrormation = Storage.get("currentUser");
    const userBalance = userInfrormation.account.balance;

    // Muestra el balance del usuario en la interfaz
    const userBalanceContainer = document.querySelector(".balance");
    userBalanceContainer.textContent = `$ ${userBalance}`;

    // Botón para mostrar el formulario de recarga
    const newRefillButton = document.querySelector(".new-refill");
    const refillForm = document.querySelector(".form-container");

    newRefillButton.addEventListener("click", () => {
        refillForm.style.display = "block";
    });

    // Elementos del formulario de recarga
    const confirmRefillButton = document.getElementById("confirm-refill");
    const cancelRefillButton = document.getElementById("cancelButton");
    const amountInput = document.getElementById("amount");
    const passwordInput = document.getElementById("password");

    // Maneja la confirmación de la recarga
    confirmRefillButton.addEventListener("click", (e) => {
        e.preventDefault();

        let amount = parseFloat(amountInput.value);
        let password = passwordInput.value;

        const userPassword = userInfrormation.password;
        clearErrors();

        // Valida la contraseña antes de permitir la recarga
        if (password !== userPassword) {
            showError("password", "Contraseña incorrecta");
            return;
        }

        // Agrega la transacción de recarga y recarga la página
        App.addTransaction(userInfrormation, amount, "Recarga", "Recarga de dinero");
        alert(`el usuario ${userInfrormation.name} a recargado $${amount} de pesos exitosamente`);
        window.location.reload();
    });

    // Botón para cancelar el formulario de recarga
    cancelRefillButton.addEventListener("click", () => {
        refillForm.style.display = "none";
        amountInput.value = "";
        passwordInput.value = "";
    });

    // Filtra y muestra solo las transacciones de tipo "Recarga"
    const ListTransactionParcial = userInfrormation.account.transactions;
    const transactionList = ListTransactionParcial.filter((transaction) => {
        return transaction.type === "Recarga";
    });

    showTransactionlist(transactionList);
});
