import { Injectable } from '@nestjs/common';
import * as cache from 'memory-cache';

@Injectable()
export class CacheService {
  put(key: string, value: any, time?: number) {
    return cache.put(key, value, time);
  }

  get(key: string) {
    return cache.get(key);
  }

  keys() {
    return cache.keys();
  }
}
