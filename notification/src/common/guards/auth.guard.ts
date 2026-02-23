
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      (req as any).user = payload;
    } catch (err) {
      console.error('AuthGuard Error:', err);
      throw new UnauthorizedException('Invalid or expired access token');
    }

    return true;
  }

  private extractToken(req: Request): string | undefined {
    // 1. Try cookie first (primary)
    if (req.cookies && req.cookies['access_token']) {
      return req.cookies['access_token'];
    }

    // 2. Try Authorization header (fallback)
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
