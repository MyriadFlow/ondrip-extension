import { gql } from "@apollo/client/core";
import { graphClient } from "../..";
import { getWalletAddress } from "../../../common";
import { GetOwnedValidTokens, GetOwnedValidTokensVariables } from "./__generated__/GetOwnedValidTokens";

export const GET_OWNED_VALID_TOKENS = gql`
  query GetOwnedValidTokens($address:String!,$validTill:Int!) {
    subTokens(where:{owner:$address,subsTime_gte:$validTill}){
        id
        credientials
        renewalFee
        rateAmount
        description
        subsTime
      }
}`

export async function getValidOwnedTokens() {
  const walletAddress = await getWalletAddress()

  const epochNow = Date.now();

  //Upto 2 Minutes
  const validTillNumber = Math.floor((epochNow / 1000) + (2 * 60))
  const variables: GetOwnedValidTokensVariables = {
    address: walletAddress.toLowerCase(),
    validTill: validTillNumber
  }
  console.log(walletAddress, epochNow);

  return graphClient.query<GetOwnedValidTokens>({
    query: GET_OWNED_VALID_TOKENS,
    variables,
  });
}