import { ExtractGenerator } from '../app/extract.js';
import { Storage } from '../app/LocalStorageService.js';
import { backToTheDashboard, showError, clearErrors } from './utils.js';
import { Transaction } from '../app/transaction.js';

document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el botón para volver al dashboard y le asigna la funcionalidad
    const backButton = document.querySelector(".back-button");
    backToTheDashboard(backButton);

    // Obtiene la información del usuario actual desde el almacenamiento local
    const userInfrormation = Storage.get("currentUser");

    // Referencias a los elementos del formulario y los inputs de fecha
    const extractForm = document.getElementById("form");
    const startDateInput = document.getElementById("date-start");
    const endDateInput = document.getElementById("date-end");

    // Maneja el envío del formulario para generar el extracto
    extractForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtiene y convierte las fechas ingresadas por el usuario
        let startDate = new Date(startDateInput.value);
        let endDate = new Date(endDateInput.value);

        // Valida que ambas fechas sean válidas
        if (isNaN(startDate) || isNaN(endDate)) {
            showError("form", "Las fechas no son válidas");
            return;
        } else {
            clearErrors();
        }

        // Formatea las fechas al formato usado en las transacciones
        startDate = Transaction.formatDate(startDate);
        endDate = Transaction.formatDate(endDate);

        // Obtiene la lista de transacciones del usuario y genera el extracto filtrado por fechas
        const transactionList = userInfrormation.account.transactions;
        const extract = ExtractGenerator.generateExtract(transactionList, startDate, endDate);

        // Muestra el modal con el extracto generado
        showExtractModal(extract);
    });

    // Función para mostrar el extracto en un modal
    function showExtractModal(extract) {
        const modal = document.getElementById("extract-modal");
        const extractList = document.getElementById("extract-list");
        extractList.innerHTML = "";

        // Si no hay transacciones en el periodo, muestra un mensaje
        if (extract.length === 0) {
            extractList.innerHTML = "<li>No hay transacciones en este periodo.</li>";
        } else {
            // Si hay transacciones, las muestra en la lista del modal
            extract.forEach(transaction => {
                const listItem = document.createElement("li");
                listItem.textContent = `${transaction.date} - ${transaction.type} - $${transaction.amount}`;
                extractList.appendChild(listItem);
            });
        }

        // Muestra el modal
        modal.style.display = "flex";

        // Permite cerrar el modal al hacer click en la X
        modal.querySelector(".close").onclick = () => {
            modal.style.display = "none";
        };
        // Permite cerrar el modal al hacer click fuera del contenido
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = "none";
        };
    }
});