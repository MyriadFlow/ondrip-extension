import { chain } from "./config"


export const getAccessControlConditions = (tokenId: number) => {
    return [
        {
            contractAddress: '0x89b597199dAc806Ceecfc091e56044D34E59985c',
            standardContractType: 'ERC721',
            chain,
            method: 'accessToCredentials',
            parameters: [
                ":userAddress"
            ],
            returnValueTest: {
                comparator: '=',
                value: 'true'
            },
        },
        {
            "operator": "and"
        },
        {
            contractAddress: '0x89b597199dAc806Ceecfc091e56044D34E59985c',
            standardContractType: 'ERC721',
            chain,
            method: 'ownerOf',
            parameters: [
                tokenId
            ],
            returnValueTest: {
                comparator: '=',
                value: ':userAddress'
            },
        },
    ]
}