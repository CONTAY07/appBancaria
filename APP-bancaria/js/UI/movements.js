import { Storage } from "../app/LocalStorageService.js";
import { backToTheDashboard, showTransactionlist } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-button");
    backToTheDashboard(backButton); // Asigna la funcionalidad para volver al dashboard

    // Obtiene la información del usuario actual desde el almacenamiento local
    const userInfrormation = Storage.get("currentUser");
    const transactionList = userInfrormation.account.transactions; // Lista de transacciones del usuario

    // Elementos del DOM para mostrar información del usuario
    const userTitle = document.getElementById("user-name");
    const accountnumber = document.getElementById("account-number");
    const balance = document.getElementById("saldo-actual");

    // Muestra los datos del usuario en la interfaz
    userTitle.textContent = userInfrormation.name;
    accountnumber.textContent = userInfrormation.account.accountNumber;
    balance.textContent = userInfrormation.account.balance;

    // Muestra la lista de transacciones en la interfaz
    showTransactionlist(transactionList);
});