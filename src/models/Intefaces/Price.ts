export class Price {
    currency: String;
    amount: Number;
    decimals: Number;
    constructor(currency: string, amount: number, decimals: number) {
        this.currency = currency;
        this.amount = amount;
        this.decimals = decimals
    }
}