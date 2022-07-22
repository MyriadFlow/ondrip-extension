import { chain, nftContractAddress } from "../../env"

export const getEvmContractConditions = (tokenId: string) => {
    return [
        {
            contractAddress: nftContractAddress,
            functionName: "accessToCredentials",
            functionParams: [tokenId],
            functionAbi: {
                inputs: [
                    { internalType: "uint256", name: "_tokenID", type: "uint256" },
                ],
                name: "accessToCredentials",
                outputs: [{ internalType: "bool", name: "access", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            chain,
            returnValueTest: {
                key: "",
                comparator: "=",
                value: "true",
            },
        },
        {
            operator: "and",
        },
        {
            contractAddress: nftContractAddress,
            functionName: "ownerOf",
            functionParams: [tokenId],
            functionAbi: {
                inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
                name: "ownerOf",
                outputs: [{ internalType: "address", name: "", type: "address" }],
                stateMutability: "view",
                type: "function",
            },
            chain,
            returnValueTest: {
                key: "",
                comparator: "=",
                value: ":userAddress",
            },
        },
    ]

}
