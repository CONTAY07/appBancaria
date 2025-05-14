export class InterestCalculator {
    static calculateDaily(balance) {
        const dailyRate = 0.0005; // Ejemplo: 0.05% de interés diario
        return balance * dailyRate;
    }
}