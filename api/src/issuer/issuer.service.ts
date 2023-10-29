import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateIdentifyResponse } from './issuer.types';

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

}
