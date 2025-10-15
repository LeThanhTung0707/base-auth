import { ConflictException, Injectable } from '@nestjs/common';
import { HashingService } from '../common/hashing.service';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private repo: UsersRepository,
    private hashing: HashingService,
  ) {}

  // REGISTER
  async register(email: string, password: string): Promise<User> {
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');
    const hash = await this.hashing.hash(password);
    return this.repo.create(email, hash);
  }

  // Verify
  async verify(email: string, password: string): Promise<User | null> {
    const u = await this.repo.findByEmail(email);
    if (!u) return null;
    const ok = await this.hashing.compare(password, u.password);
    return ok ? u : null;
  }
}
