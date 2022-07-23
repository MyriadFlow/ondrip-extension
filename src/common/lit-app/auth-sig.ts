import { ethers } from "ethers";
import { getWalletAddress, getWalletMnemonic } from "../common";
import { getEip4361Msg } from "../wallet/get-eip4361-msg";
import { AuthSig } from "./lit-app";

export async function getAuthSign(): Promise<AuthSig> {
    const mnemonic = await getWalletMnemonic()
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    const msg = getEip4361Msg(wallet.address)
    const sig = await wallet.signMessage(msg)
    return {
        address: wallet.address,
        derivedVia: "web3.personal.sign",
        sig,
        signedMessage: msg
    }
}