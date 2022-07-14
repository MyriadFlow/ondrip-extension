console.table("Starting OnDrip | MyriadFlow Browser Extension...");

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "injectCredentials": {
                console.table("Got Request...");
                console.table(message);
                (document.querySelector("input[id=id_userLoginId]") as HTMLInputElement).value = message.username;
                (document.querySelector("input[id=id_password]") as HTMLInputElement).value = message.password;
                document.getElementsByTagName("form")[0].submit();;
                sendResponse("Injection Successful");
            }
                break;
        }
    }
);