export function getWalletAddress() {
    return new Promise<string>((resolve, reject) => {
        chrome.storage.local.get(['walletAddress'], (result) => {
            resolve(result.walletAddress);
        });
    });
}