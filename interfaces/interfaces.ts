export interface Order {
    orderId: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    tokenInSymbol: string,
    tokenOutSymbol: string,
    tokenInAmount: string,
    tokenInDecimal: string,
    tokenOutDecimal: string,
    poolFee: string
}

export type TokenInformation = {
    address: string;
    symbol: string;
    decimal: string;
};