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
