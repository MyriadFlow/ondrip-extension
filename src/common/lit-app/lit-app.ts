import LitJsSdk from 'lit-js-sdk'
import { getAccessControlConditions } from "./access-control"
type SubCreds = {
    username: string,
    password: string
}
let litClient: any
const chain = "mumbai"

const initLitClient = async () => {
    if (!litClient)
        litClient = new LitJsSdk.LitNodeClient();
    await litClient.current.connect();
}

const getCreds = async (tokenId: number, encryptedSymmetricKey: Uint8Array, encryptedString: Blob): Promise<SubCreds> => {
    await initLitClient()
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain,
    });

    const client = litClient.current;
    const symmetricKey = await client.getEncryptionKey({
        accessControlConditions: getAccessControlConditions(tokenId),
        toDecrypt: Buffer.from(encryptedSymmetricKey).toString("hex"),
        chain,
        authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
        encryptedString,
        symmetricKey
    );

    return JSON.parse(decryptedString) as SubCreds
}
