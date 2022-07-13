// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
    initDApp();
});

let maticRPCURL;
let mnemonicWallet;
let polygonTestnetProvider;
let onDripWallet;

async function initDApp() {
    maticRPCURL = 'https://polygon-mumbai.g.alchemy.com/v2/';
    let mnemonic = await getWalletMnemonic();
    mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    
    polygonTestnetProvider = new ethers.providers.JsonRpcProvider(maticRPCURL);
    onDripWallet = mnemonicWallet.connect(polygonTestnetProvider);
    console.log("Total Transactions: " + await onDripWallet.getTransactionCount());
    
    onDripContract = new ethers.Contract(onDripContractAddress, onDripContractABI, onDripWallet);
    // console.log(await getContractName(onDripContract));
}

function getWalletMnemonic() {
    return new Promise(resolve => {
        chrome.storage.local.get(['mnemonic'], function(result) {
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
        onDripContract.name().then((result) => {
            resolve(result);
        });
    });
}

// https://polygon-mumbai.g.alchemy.com/v2/BhfDGgKfFJch5QtGJ8L9HVfuFmv3LjsG