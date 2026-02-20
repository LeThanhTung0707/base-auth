import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  createRefreshToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    userAgent?: string,
    ip?: string,
  ) {
    return this.prisma.refreshToken.create({
      data: { userId, tokenHash, expiresAt, userAgent, ip },
    });
  }

  findByHash(tokenHash: string) {
    return this.prisma.refreshToken.findUnique({ where: { tokenHash } });
  }

  async revokeById(id: string) {
    await this.prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForUser(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async updateRefreshToken(
    id: string,
    newHash: string,
    expiresAt: Date,
    userAgent?: string,
    ip?: string,
  ): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id },
      data: {
        tokenHash: newHash,
        expiresAt,
        userAgent,
        ip,
        revokedAt: null,
      },
    });
  }

  /** Get all active (non-revoked, non-expired) sessions for a user */
  getActiveSessions(userId: string) {
    return this.prisma.refreshToken.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userAgent: true,
        ip: true,
        createdAt: true,
        expiresAt: true,
      },
    });
  }

  /** Revoke a specific session, only if it belongs to the given user */
  revokeSessionById(userId: string, sessionId: string) {
    return this.prisma.refreshToken.updateMany({
      where: { id: sessionId, userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /** Revoke all sessions for user EXCEPT the one with the given tokenHash */
  revokeOtherSessions(userId: string, currentTokenHash: string) {
    return this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
        tokenHash: { not: currentTokenHash },
      },
      data: { revokedAt: new Date() },
    });
  }
}
