import 'dotenv/config';
import { ethers } from 'ethers';

const infuraApiKey = process.env.INFURA_API_KEY!;
const privateKey = process.env.WALLET_PRIVATE_KEY!;
const toAddress = process.env.TO_ADDRESS!; // ujins 지갑 주소.

const provider = new ethers.InfuraProvider('sepolia', infuraApiKey); //
const wallet = new ethers.Wallet(privateKey, provider); // 요개 블로그 기준 signer

async function main() {
    console.log('Wallet Address:', wallet.address);
    const bal = await provider.getBalance(wallet.address);
    const block = await provider.getBlockNumber()
    console.log('have eth:', ethers.formatEther(bal), 'ETH');
    console.log('block_num', ethers.formatEther(block))

    const tx = {
        to: toAddress,
        value: ethers.parseEther('0.004'),
    }

    console.log('sending tx...');
    const sent = await wallet.sendTransaction(tx);
    console.log('tx hash:', sent.hash);

    const receipt = await sent.wait(); // 1~2 블록 대기
    console.log("confirmed in block:", receipt?.blockNumber);

    const balReceiver = await provider.getBalance(toAddress);
    console.log("after address balance:", ethers.formatEther(balReceiver), "ETH");
}

main().catch(console.error);