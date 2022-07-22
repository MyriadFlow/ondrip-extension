import LitJsSdk from 'lit-js-sdk'
import { getEvmContractConditions } from "./access-control"
import { Buffer } from "buffer"
type SubCreds = {
    username: string,
    password: string
}

type SmartContractCreds = {
    encryptedKey: string, //hex
    encrypedtedData: string //hex
}

type AuthSig = {
    sig: string,// hex
    derivedVia: string,
    signedMessage: string,
    address: string
}

let litClient: any
const chain = "mumbai"

const initLitClient = async () => {
    if (!litClient)
        litClient = new LitJsSdk.LitNodeClient();
    await litClient.connect();
}

export const getCreds = async (authSig: AuthSig, tokenId: string, smartContractCredsJsonStr: string) => {
    const smartContractCreds: SmartContractCreds = JSON.parse(smartContractCredsJsonStr)
    await initLitClient()

    const params = {
        evmContractConditions: getEvmContractConditions(tokenId),
        toDecrypt: smartContractCreds.encryptedKey,
        chain,
        authSig,
    }

    const symmetricKey = await litClient.getEncryptionKey(params);

    var typedArray = new Uint8Array(
        (smartContractCreds.encrypedtedData as any).match(/[\da-f]{2}/gi).map(function (h: any) {
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
