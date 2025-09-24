import 'dotenv/config';
import { ethers } from 'ethers';

const INFURA_API_KEY = process.env.INFURA_API_KEY!;
const PRIVATE_KEY     = process.env.WALLET_PRIVATE_KEY!;

const provider = new ethers.InfuraProvider('sepolia', INFURA_API_KEY);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function main() {
    console.log('Wallet Address:', wallet.address);
    const bal = await provider.getBalance(wallet.address);
    const block = await provider.getBlockNumber()
    console.log('have eth:', ethers.formatEther(bal), 'ETH');
    console.log('block_num', ethers.formatEther(block))
}
main().catch(console.error);