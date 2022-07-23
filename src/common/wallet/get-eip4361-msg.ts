import { chainId } from "../../env"

export const getEip4361Msg = (walletAddr: string): string => {
    const nowDate = new Date()
    const ISODate = nowDate.toISOString()
    const nonce = Date.now();
    const msg = `Ondrip.extension wants you to sign in with your Ethereum account:
    ${walletAddr}
    
    I accept the OnDrip Terms of Service: https://ondrip.myriadflow/tos
    
    URI: https://ondrip.myriadflow/sign
    Version: 1
    Chain ID: ${chainId}
    Nonce: ${nonce}
    Issued At: ${ISODate}
    Resources:
    - https://example.com/my-web2-claim.json`

    return msg
}