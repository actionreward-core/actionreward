export interface IdentifyState {
  claimsTreeRoot: string;
  createdAt: string;
  modifiedAt: string;
  state: string;
  status: string;
}

export interface CreateIdentifyResponse {
  identifier: string;
  state: IdentifyState;
}

export interface CreateClaimInput {
  credentialSchema: string;
  type: string;
  credentialSubject: any;
  expiration: number;
}

export interface CreateClaimResponse {
  id: string;
}
