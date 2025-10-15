import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  setAuthCookies,
  clearAuthCookies,
  setCsrfCookie,
} from '../common/cookie.util';
import { Response, Request } from 'express';
import { CsrfInterceptor } from './csrf.interceptor';
import * as crypto from 'crypto';
import { AuthCsrfGuard } from './guards/auth-csrf.guard';
import { User } from 'src/common/decorators/user.decorator';
class AuthDto {
  email!: string;
  password!: string;
}

@Controller('auth')
@UseInterceptors(CsrfInterceptor)
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access, refresh, accessMaxAgeMs, refreshMaxAgeMs } =
      await this.auth.register(
        dto.email,
        dto.password,
        req.headers['user-agent'],
        req.ip,
      );

    setAuthCookies(res, access, accessMaxAgeMs, refresh, refreshMaxAgeMs);
    const csrf = crypto.randomUUID();

    setCsrfCookie(res, csrf);
    res.setHeader('x-csrf-token', csrf);
    return { ok: true };
  }

  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access, refresh, accessMaxAgeMs, refreshMaxAgeMs } =
      await this.auth.login(
        dto.email,
        dto.password,
        req.headers['user-agent'],
        req.ip,
      );
    setAuthCookies(res, access, accessMaxAgeMs, refresh, refreshMaxAgeMs);
    const csrf = crypto.randomUUID();
    setCsrfCookie(res, csrf);
    res.setHeader('x-csrf-token', csrf);
    return { ok: true };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const old = req.cookies?.['refresh_token'];
    const { access, refresh, accessMaxAgeMs, refreshMaxAgeMs } =
      await this.auth.refresh(old, req.headers['user-agent'], req.ip);
    setAuthCookies(res, access, accessMaxAgeMs, refresh, refreshMaxAgeMs);

    const csrf = crypto.randomUUID();
    setCsrfCookie(res, csrf);
    res.setHeader('x-csrf-token', csrf);

    return { ok: true };
  }

  @Post('logout')
  @UseGuards(AuthCsrfGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    clearAuthCookies(res);
    return { ok: true };
  }

  @Get('me')
  @UseGuards(AuthCsrfGuard)
  getMe(@User() user) {
    return user;
  }
}
