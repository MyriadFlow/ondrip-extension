// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.

import * as ethers from "ethers"
import { OnDripContractABI, OnDripContractAddress } from "./onDripContract"

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

    // let onDripContract = new ethers.Contract(OnDripContractAddress, OnDripContractABI, onDripWallet);
    // console.log(await getContractName(onDripContract));
}

function getWalletMnemonic() {
    return new Promise<string>(resolve => {
        chrome.storage.local.get(['mnemonic'], function (result) {
            // console.log('Mnemonic currently is: ' + result.mnemonic);
            resolve(result.mnemonic);
        });
    });
}

function getWalletAddress() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['walletAddress'], (result) => {
            console.log(result.walletAddress);
            resolve(result.walletAddress);
        });
    });
}

function getContractName() {
    return new Promise((resolve, reject) => {
        // onDripContract.name().then((result) => {
        //     resolve(result);
        // });
        reject("not implemented")
    });
}

// https://polygon-mumbai.g.alchemy.com/v2/BhfDGgKfFJch5QtGJ8L9HVfuFmv3LjsG