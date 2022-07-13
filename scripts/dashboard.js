// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('autoFill').addEventListener('click', function() {
        console.table("Getting & Injecting Values...");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type:"injectCredentials", value: "Netflix", username: "user-email-address@email.com", password: "somepass@10"}, function(response) {
                $("#text").text(response);
            });
        });
    }, false);
});

function getDomainName(tabURL){
    var tabURL = new URL(tabURL);
    return tabURL.hostname;
}

function getUserRole(){
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
    currentDomain = getDomainName(tabs[0].url);
    
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
