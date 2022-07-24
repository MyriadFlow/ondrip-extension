import { AuthSig, getCreds } from "./common/lit-app/lit-app";

console.table("Starting OnDrip | MyriadFlow Browser Extension...");

chrome.runtime.onMessage.addListener(
    async function (message, sender, sendResponse) {
        switch (message.type) {
            case "injectCredentials":
                const res = await getAndInjectCreds(message.authSign, message.tokenId, message.smartContractCreds)
                sendResponse(res)
                break;
        }
    }
);


async function getAndInjectCreds(authSign: AuthSig, tokenId: string, smartContractCreds: string) {
    const creds = await getCreds(authSign, tokenId, smartContractCreds)
    console.table("Got Request...");
    (document.querySelector(`input#ap_email`) as HTMLInputElement).value = creds.username;
    (document.querySelector("input#ap_password") as HTMLInputElement).value = creds.password;
    (document.querySelector("input#signInSubmit") as HTMLInputElement).click();
    return "Inject success"
}