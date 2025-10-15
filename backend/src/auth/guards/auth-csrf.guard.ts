import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthCsrfGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const method = req.method.toUpperCase();

    const token = req.cookies?.['access_token'];
    if (!token) throw new UnauthorizedException('Missing access token');

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      (req as any).user = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const csrfHeader = req.headers['x-csrf-token'];
      const csrfCookie = req.cookies?.['x-csrf-token'];
      if (!csrfHeader || !csrfCookie)
        throw new ForbiddenException('Missing CSRF token');
      if (csrfHeader !== csrfCookie)
        throw new ForbiddenException('Invalid CSRF token');
    }

    return true;
  }
}
