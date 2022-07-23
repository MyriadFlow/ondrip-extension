export function getWalletAddress() {
    return new Promise<string>((resolve, reject) => {
        chrome.storage.local.get(['walletAddress'], (result) => {
            resolve(result.walletAddress);
        });
    });
}

export function getWalletMnemonic() {
    return new Promise<string>(resolve => {
        chrome.storage.local.get(['mnemonic'], function (result) {
            // console.log('Mnemonic currently is: ' + result.mnemonic);
            resolve(result.mnemonic);
        });
    });
}