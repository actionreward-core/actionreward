import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  CreateClaimInput,
  CreateClaimResponse,
  CreateIdentifyResponse,
} from './issuer.types';

@Injectable()
export class IssuerService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ISSUER_SERVER_URL,
      auth: {
        username: process.env.ISSUER_USERNAME,
        password: process.env.ISSUER_PASSWORD,
      },
    });
  }

  async createIdentity() {
    const { data } = await this.client.post<CreateIdentifyResponse>(
      '/v1/identities',
      {
        didMetadata: {
          method: 'polygonid',
          blockchain: 'polygon',
          network: 'mumbai',
        },
      },
    );
    return data;
  }

  async createClaim({
    identifier,
    ...input
  }: CreateClaimInput & { identifier: string }) {
    const { data } = await this.client.post<CreateClaimResponse>(
      `/v1/${identifier}/claims`,
      input,
    );
    return data;
  }

  async getClaimQrCodeData({
    id,
    identifier,
  }: {
    identifier: string;
    id: string;
  }) {
    const { data } = await this.client.get<CreateClaimResponse>(
      `/v1/${identifier}/claims/${id}/qrcode`,
    );
    return data;
  }
}
