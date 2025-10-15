import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';
import * as crypto from 'crypto';

function msMinutes(m: number) {
  return m * 60 * 1000;
}
function msDays(d: number) {
  return d * 24 * 60 * 60 * 1000;
}

@Injectable()
export class AuthService {
  private accessTtlMin = Number(process.env.ACCESS_TTL_MIN ?? 15);
  private refreshTtlDays = Number(process.env.REFRESH_TTL_DAYS ?? 14);

  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private repo: AuthRepository,
  ) {}

  private signAccess(userId: string) {
    return this.jwt.sign(
      { sub: userId },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: `${this.accessTtlMin}m`,
      },
    );
  }
  private signRefresh(userId: string, jti: string) {
    return this.jwt.sign(
      { sub: userId, jti },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: `${this.refreshTtlDays}d`,
      },
    );
  }
  private hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async register(email: string, password: string, ua?: string, ip?: string) {
    const user = await this.users.register(email, password);
    return this.issuePair(user.id, ua, ip);
  }

  async login(email: string, password: string, ua?: string, ip?: string) {
    const user = await this.users.verify(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.issuePair(user.id, ua, ip);
  }

  async issuePair(userId: string, userAgent?: string, ip?: string) {
    const jti = crypto.randomUUID();
    const access = this.signAccess(userId);
    const refresh = this.signRefresh(userId, jti);
    const { exp } = this.jwt.decode(refresh) as any;
    const expiresAt = new Date(exp * 1000);
    await this.repo.createRefreshToken(
      userId,
      this.hashToken(refresh),
      expiresAt,
      userAgent,
      ip,
    );
    return {
      access,
      refresh,
      accessMaxAgeMs: msMinutes(this.accessTtlMin),
      refreshMaxAgeMs: msDays(this.refreshTtlDays),
    };
  }

  async refresh(oldRefresh: string, ua?: string, ip?: string) {
    try {
      const payload = await this.jwt.verifyAsync(oldRefresh, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const oldHash = this.hashToken(oldRefresh);
      const stored = await this.repo.findByHash(oldHash);
      if (!stored || stored.revokedAt) {
        throw new UnauthorizedException('Refresh token revoked or not found');
      }

      const newAccess = this.signAccess(payload.sub as string);

      const jti = stored.id;
      const newRefresh = this.signRefresh(payload.sub as string, jti);

      const { exp } = this.jwt.decode(newRefresh) as any;
      const expiresAt = new Date(exp * 1000);

      await this.repo.updateRefreshToken(
        stored.id,
        this.hashToken(newRefresh),
        expiresAt,
        ua,
        ip,
      );

      return {
        access: newAccess,
        refresh: newRefresh,
        accessMaxAgeMs: msMinutes(this.accessTtlMin),
        refreshMaxAgeMs: msDays(this.refreshTtlDays),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
