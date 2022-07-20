import LitJsSdk from 'lit-js-sdk'
import { getAccessControlConditions } from "./access-control"
type SubCreds = {
    username: string,
    password: string
}

type SmartContractCreds = {
    excryptedKey: string, //hex
    excrypedtedData: string //hex
}
let litClient: any
const chain = "mumbai"

const initLitClient = async () => {
    if (!litClient)
        litClient = new LitJsSdk.LitNodeClient();
    await litClient.current.connect();
}

const getCreds = async (tokenId: number, contractCredsHex: string): Promise<SubCreds> => {
    const smartContractCredsJson = Buffer.from(contractCredsHex, "hex").toString()
    const smartContractCreds: SmartContractCreds = JSON.parse(smartContractCredsJson)
    await initLitClient()
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain,
    });

    const client = litClient.current;
    const symmetricKey = await client.getEncryptionKey({
        accessControlConditions: getAccessControlConditions(tokenId),
        toDecrypt: smartContractCreds.excryptedKey,
        chain,
        authSig,
    });

    var typedArray = new Uint8Array(
        (smartContractCreds.excrypedtedData as any).match(/[\da-f]{2}/gi).map(function (h: any) {
            return parseInt(h, 16);
        })
    );
    const encryptedDataBlob = new Blob([typedArray], {
        type: "'application/octet-stream",
    });
    const decryptedString = await LitJsSdk.decryptString(
        encryptedDataBlob,
        symmetricKey
    );
    const jsonString = Buffer.from(decryptedString).toString()

    return JSON.parse(jsonString) as SubCreds
}
