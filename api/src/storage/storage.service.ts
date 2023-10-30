import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService extends Storage {
  constructor() {
    super({
      keyFilename: './gcloud-key.json',
    });
  }
}
