import { artifacts, ethers } from "hardhat"
import { configDotenv } from "dotenv"
configDotenv()
export default async function initilizeContract() {
    const contractAddress = '0x7dF9EF25Cb666Dc9dA15E5cd380570e6b42c50bA'
    const contractArtifacts = artifacts.readArtifactSync('contracts/interfaces/AggregatedSwap.sol:AggregatedSwap')
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT)
    const contract = new ethers.Contract(contractAddress, contractArtifacts.abi, provider)
    return contract
}
