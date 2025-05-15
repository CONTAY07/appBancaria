import { InterestCalculator } from "../app/interestCalculator.js";
import { Storage } from "../app/LocalStorageService.js";
import { backToTheDashboard } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-button");
    backToTheDashboard(backButton); // Asigna la funcionalidad para volver al dashboard

    const userInfrormation = Storage.get("currentUser");
    // Obtiene el balance del usuario y lo convierte a número flotante
    const userBalance = parseFloat(userInfrormation.account.balance);

    const calculatotIntrestForm = document.getElementById("form");

    // Maneja el envío del formulario de cálculo de interés
    calculatotIntrestForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const resultContainer = document.querySelector(".result-container");
        resultContainer.style.display = "grid"; // Muestra el modal de resultado

        const timeInput = document.getElementById("number");
        const time = parseInt(timeInput.value);

        // Calcula el interés y el total usando el saldo y el tiempo ingresado
        const interest = InterestCalculator.calculateDaily(userBalance, time);
        const total = userBalance + interest;

        // Muestra los resultados en el modal
        document.getElementById("result-time").textContent = time;
        document.getElementById("result-interest").textContent = interest.toFixed(2);
        document.getElementById("result-total").textContent = total.toFixed(2);
    });

    // Botón para cerrar el resultado y ocultar el modal
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        const resultContainer = document.querySelector(".result-container");
        resultContainer.style.display = "none";
    });
});