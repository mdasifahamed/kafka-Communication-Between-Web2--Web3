import { Order, TokenInformation } from "../../interfaces/interfaces"
import TokenMeatadata from "../../tokenInformation.json"

function randomIndex(index: number): number {
    return Math.floor(Math.random() * index)
}
function randomAmountIn(): string {
    return Math.floor(Math.random() * 100).toString()
}


export default function generateRandomOrder(numberOfOrder: number) {
    const tokens: TokenInformation[] = TokenMeatadata.map(token => {
        const key = Object.keys(token)[0];
        const data = (token as any)[key];
        return {
            address: data.Address,
            symbol: data.Symbol,
            decimal: data.Decimal
        };
    })
    const orders: Order[] = []
    for (let i = 0; i < numberOfOrder; i++) {
        // pick two distinct tokens
        let inIdx = randomIndex(tokens.length);
        let outIdx = randomIndex(tokens.length - 1);
        if (outIdx >= inIdx) outIdx++;
        const tokenIn = tokens[inIdx];
        const tokenOut = tokens[outIdx];

        orders.push({
            orderId: `00${i}`,
            tokenInAddress: tokenIn.address,
            tokenOutAddress: tokenOut.address,
            tokenInSymbol: tokenIn.symbol,
            tokenOutSymbol: tokenOut.symbol,
            tokenInAmount: randomAmountIn(),
            tokenInDecimal: tokenIn.decimal,
            tokenOutDecimal: tokenOut.decimal,
            poolFee: '3000'
        });
    }
    return JSON.stringify(orders)

}


