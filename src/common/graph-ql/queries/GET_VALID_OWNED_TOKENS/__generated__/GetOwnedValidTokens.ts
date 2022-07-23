/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOwnedValidTokens
// ====================================================

export interface GetOwnedValidTokens_subTokens {
  __typename: "SubToken";
  id: string;
  credientials: string;
  renewalFee: any;
  rateAmount: any;
  description: string;
  subsTime: any;
}

export interface GetOwnedValidTokens {
  subTokens: GetOwnedValidTokens_subTokens[];
}

export interface GetOwnedValidTokensVariables {
  address: string;
  validTill: any;
}
