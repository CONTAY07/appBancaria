import { App } from "../app/App.js";
import { Storage } from "../app/LocalStorageService.js";
import { backToTheDashboard, validateAmount, showError, clearErrors } from "../UI/utils.js";

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

    // Elementos del formulario y código de retiro
    const withdrawForm = document.getElementById("form");
    const withdrawCode = document.querySelector(".withdrawal-code");
    const amountInput = document.getElementById("amount");

    // Maneja el envío del formulario de retiro
    withdrawForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let amount = parseFloat(amountInput.value);
        const amountError = validateAmount(amount, userBalance);
        if (!amountError) {
            showError("amount", "La cantidad no es válida");
            return;
        } else {
            clearErrors();
        }

        // Muestra el código de retiro y oculta el formulario
        withdrawCode.style.display = "block";
        withdrawForm.style.display = "none";
        const codeContainer = document.querySelector(".code");
        const codeVisible = document.querySelector(".code-visibility");
        let visibleCode = true;

        // Genera un código de 6 dígitos aleatorio
        const code = Math.floor(Math.random() * 900000) + 100000;

        codeContainer.textContent = code;
        // Permite alternar la visibilidad del código
        codeVisible.addEventListener("click", () => {
            if (visibleCode) {
                codeContainer.textContent = code;
                visibleCode = false;
            } else {
                codeContainer.textContent = "******";
                visibleCode = true;
            }
        });
    });

    // Botón para confirmar el retiro y registrar la transacción
    const confirmWithdrawButton = document.getElementById("confirmation");

    confirmWithdrawButton.addEventListener("click", (event) => {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);

        App.addTransaction(userInfrormation, amount, "Retiro", "Retiro de dinero");
        alert(`El usuario ${userInfrormation.name} ha retirado $${amount} de pesos exitosamente`);
        window.location.reload();
    });
});