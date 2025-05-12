import { ethers } from "hardhat";
import initilizeContract from "../contracts/initlizeContract";

export default async function qouter({ order }: { order: string }): Promise<String> {
    const contract = await initilizeContract()
    const tradeOrder = JSON.parse(order)
    const qoutes = await contract.getAllQuoteForTokenToToken.staticCall(
        tradeOrder.tokenInAddress,
        tradeOrder.tokenOutAddress,
        ethers.parseUnits(tradeOrder.tokenInAmount, parseInt(tradeOrder.tokenInDecimal)),
        parseInt(tradeOrder.poolFee),
        0)
    const unsortedqoutes: bigint[] = [...qoutes]
    const sortedQuote = unsortedqoutes.sort((a: bigint, b: bigint) => (a > b ? -1 : a < b ? 1 : 0))
    const tokenOut = ethers.formatUnits(sortedQuote[0], parseInt(tradeOrder.tokenOutDecimal))
    console.log(
        `
    ┌─────────────────────────────────────────────────┐
    │  Order ID             : %s
    │  Token In  (Symbol)   : %s
    │  Token Out (Symbol)   : %s
    │  Token In  Amount     : %s
    │  Token Out Amount     : %s
    └─────────────────────────────────────────────────┘
    `,
        tradeOrder.orderId,
        tradeOrder.tokenInSymbol,
        tradeOrder.tokenOutSymbol,
        tradeOrder.tokenInAmount,
        tokenOut.toString()
    );
    return tokenOut
}

