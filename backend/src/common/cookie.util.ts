import { Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';
const cookieDomain = process.env.COOKIE_DOMAIN || undefined;
const CSRF_TTL_DAYS = Number(process.env.CSRF_TTL_DAYS ?? 14);
export const CSRF_TTL_MS = CSRF_TTL_DAYS * 24 * 60 * 60 * 1000;
function getBaseCookieOptions() {
  const isCrossDomain = !!cookieDomain;

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isCrossDomain ? ('none' as const) : ('lax' as const),
    domain: isCrossDomain ? cookieDomain : undefined,
    path: '/',
  };
}

function getBaseCookieCsrf() {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieDomain = process.env.COOKIE_DOMAIN || undefined;
  const isCrossDomain = !!cookieDomain;

  return {
    httpOnly: false,
    secure: isProd,
    sameSite: isCrossDomain ? ('none' as const) : ('lax' as const),
    domain: isCrossDomain ? cookieDomain : undefined,
    path: '/',
  };
}

export function setAuthCookies(
  res: Response,
  access: string,
  accessMaxAgeMs: number,
  refresh: string,
  refreshMaxAgeMs: number,
) {
  const base = getBaseCookieOptions();

  res.cookie('access_token', access, {
    ...base,
    maxAge: accessMaxAgeMs,
  });

  res.cookie('refresh_token', refresh, {
    ...base,
    maxAge: refreshMaxAgeMs,
  });
}

export function setCsrfCookie(res: Response, token: string) {
  const base = getBaseCookieCsrf();
  res.cookie('x-csrf-token', token, {
    ...base,
    maxAge: CSRF_TTL_MS,
  });
}

export function clearAuthCookies(res: Response) {
  const base = getBaseCookieOptions();
  res.clearCookie('access_token', base);
  res.clearCookie('refresh_token', base);

  const csrfBase = getBaseCookieCsrf();
  res.clearCookie('x-csrf-token', csrfBase);
}
