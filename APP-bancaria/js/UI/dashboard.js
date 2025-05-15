import { Storage }  from "../app/LocalStorageService.js"; // Importa el servicio de almacenamiento local

document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el usuario actual desde el almacenamiento local
    const user = Storage.get("currentUser");

    // Muestra el primer nombre del usuario en el dashboard
    const nameUser = document.getElementById("user-name");
    const firstName = user.name.split(" ")[0];
    nameUser.textContent = firstName;

    // Muestra el número de cuenta enmascarado y permite alternar su visibilidad
    const accountNumber = document.getElementById("account-number");
    const account = user.account.accountNumber;
    accountNumber.textContent = "****-****-****-" + account.slice(-4); // Solo muestra los últimos 4 dígitos
    let accountVisible = true;

    const accountButton = document.querySelector(".account-visibility");
    accountButton.addEventListener("click", () => {
        if (accountVisible) {
            accountNumber.textContent = account; // Muestra el número completo
            accountVisible = false;
        } else {
            accountNumber.textContent = "****-****-****-" + account.slice(-4); // Vuelve a enmascarar
            accountVisible = true;
        }
    });

    // Muestra el saldo enmascarado y permite alternar su visibilidad
    const balanceUser = document.getElementById("saldo-actual");
    const balance = user.account.balance;
    balanceUser.textContent = "****.**";
    let balanceVisible = true;

    const balanceButton = document.querySelector(".balance-visibility");
    balanceButton.addEventListener("click", () => {
        if (balanceVisible) {
            balanceUser.textContent = balance.toFixed(2).replace(".", ","); // Muestra el saldo real
            balanceVisible = false;
        } else {
            balanceUser.textContent = "****.**"; // Vuelve a enmascarar
            balanceVisible = true;
        }
    });

    // Botón para cerrar sesión
    const logionOutButton = document.querySelector(".logout");
    logionOutButton.addEventListener("click", () => {
        Storage.delete("currentUser"); // Elimina el usuario actual del almacenamiento local
        window.location.href = "login.html"; // Redirige a la página de login
    });
});
