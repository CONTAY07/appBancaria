// Clase que representa una transacción bancaria
export class Transaction {
    constructor(amount, type, description) {
        this.amount = amount; // Monto de la transacción
        this.type = type; // Tipo de transacción (ej: "Retiro", "Depósito")
        this.description = description; // Descripción de la transacción
        this.date = new Date(); // Fecha de la transacción en formato YYYY-MM-DD
    }

    // Método para formatear la fecha como YYYY-MM-DD
    static formatDate(date) {
        // Si date es string, conviértelo a Date
        if (typeof date === "string") {
            date = new Date(date);
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }
}