// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.

import * as ethers from "ethers"
import { getWalletMnemonic } from "./common";

let maticRPCURL;
let mnemonicWallet;
export let polygonTestnetProvider: ethers.ethers.providers.JsonRpcProvider;
export let onDripWallet: ethers.ethers.Wallet;
initDApp()
async function initDApp() {
    // TODO: No commit
    maticRPCURL = 'https://polygon-mumbai.g.alchemy.com/v2/Kn8Q-CMICU01S07NwJKBrRg0755VaQEZ';
    let mnemonic = await getWalletMnemonic();
    mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);

    polygonTestnetProvider = new ethers.providers.JsonRpcProvider(maticRPCURL);
    onDripWallet = mnemonicWallet.connect(polygonTestnetProvider);
    console.log("Total Transactions: " + await onDripWallet.getTransactionCount());
}
