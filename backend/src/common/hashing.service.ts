import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashingService {
  hash(raw: string) {
    return bcrypt.hash(raw, 12);
  }
  compare(raw: string, hash: string) {
    return bcrypt.compare(raw, hash);
  }
}
