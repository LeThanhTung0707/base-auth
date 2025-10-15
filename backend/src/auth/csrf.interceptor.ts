import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    const method = req.method.toUpperCase();
    const path = req.path;

    if (
      path.startsWith('/auth/login') ||
      path.startsWith('/auth/register') ||
      path.startsWith('/auth/refresh')
    ) {
      return next.handle();
    }

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const header = req.headers['x-csrf-token'];
      const cookie = req.cookies?.['x-csrf-token'];
      if (!header || !cookie || header !== cookie) {
        throw new ForbiddenException('Bad CSRF token');
      }
    }

    return next.handle();
  }
}
