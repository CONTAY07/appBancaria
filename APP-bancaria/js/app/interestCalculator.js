export class InterestCalculator {
    static calculateDaily(balance, time) {
        const dailyRate = 0.0005; // Ejemplo: 0.05% de interés diario
        balance = parseFloat(balance);
        time = parseInt(time);
        return (balance * dailyRate) * time; // Interés acumulado
    }
}