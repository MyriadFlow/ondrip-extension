// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
import * as ethers from "ethers"
import { onDripWallet, polygonTestnetProvider } from "../common/dapp";
import $ from "jquery";
import { getWalletAddress } from "../common/common";
import { AuthSig } from "../common/lit-app/lit-app";
import { getAuthSign } from "../common/lit-app/auth-sig";
import { getValidOwnedTokens } from "../common/graph-ql/queries/GET_VALID_OWNED_TOKENS/getValidOwnTokens";
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('autoFill')?.addEventListener('click', async function () {
        console.table("Getting & Injecting Values...");
        try {
            const msg = await getMessage()
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id ?? -1, { type: "injectCredentials", ...msg }, function (response) {
                    $("#text").text(response);
                });
            });
        } catch (error) {
            console.log(error);

            $("#text").text(error as string);
        }

    }, false);
});

type params = {
    authSign: AuthSig,
    tokenId: string,
    smartContractCreds: string
}
async function getMessage(): Promise<params> {
    const res = await getValidOwnedTokens()
    const subToken = res.data.subTokens[0]
    if (!subToken)
        throw new Error("No tokens available to inject");
    if (subToken.credientials.length < 10) {
        throw new Error("Credientials not available or invalid");
    }
    return {
        authSign: await getAuthSign(),
        smartContractCreds: subToken.credientials,
        tokenId: subToken.id
    }
}

function getDomainName(_tabURL: string) {
    var tabURL = new URL(_tabURL);
    return tabURL.hostname;
}

function getUserRole() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['userRole'], (result) => {
            resolve(result.userRole);
        });
    });
}

async function loadApp() {
    let walletAddress = await getWalletAddress();
    $("#walletAddress").text(walletAddress);
    let currentBlock = await polygonTestnetProvider.getBlockNumber();
    let balance = await ethers.utils.formatEther(await onDripWallet.getBalance());
    $("#blockStatus").text("Block# " + currentBlock + "\t| Balance: " + balance);
}

// App Start
chrome.tabs.query({
    currentWindow: true,
    active: true
}, function (tabs) {
    // Load App
    loadApp();

    // Get Domain
    let currentDomain = getDomainName(tabs[0].url ?? "");

    // Remove Loader
    $('.loader').animate({
        opacity: 0
    }, 500, function () {
        if ('newtab' == currentDomain) {
            // dontDOAnything();
            return;
        } else {
            $("#domain").val(currentDomain);
            // visitNFTPage();
        }
    });
});
