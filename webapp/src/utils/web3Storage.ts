/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-ignore
import { Web3Storage } from 'web3.storage';

type UploadToWeb3StorageOptions = {
  maxRetries?: number
  maxChunkSize?: number
  wrapWithDirectory?: boolean
  name?: string
}

export const uploadToWeb3Storage = (files: File[], options?: UploadToWeb3StorageOptions): Promise<string> => {
  const token = import.meta.env.VITE_WEB3_STORAGE_TOKEN as string;
  const client = new Web3Storage({ token });
  return client.put(files, options);
};

export const getCIDLink = (cid: string, path?: string) => {
  if (!path) {
    return `https://w3s.link/ipfs/${cid}`;
  }
  return `https://w3s.link/ipfs/${cid}${path.startsWith('/') ? path: `/${path}`}`;
}