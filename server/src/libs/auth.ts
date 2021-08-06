import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';

export type MeType = {
  id: string;
  username: string;
  admin: boolean;
};

export type TokenType = {
  exp: number;
} & MeType;

export function setCookie(ctx: Context, token?: string) {
  ctx.cookies.set('__PAYSYS_TOKEN__', token && `Bearer ${token}`, {
    httpOnly: token ? true : undefined,
    maxAge: token ? 1000 * 60 * 60 * 24 * 7 : undefined,
  });
}

const decodeToken = <T = any>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET!, (err, decoded) => {
      if (err) reject(err);

      resolve(decoded as any);
    });
  });
};

export default async function jwtMiddleware(ctx: Context, next: Next) {
  const token: string | undefined = ctx.cookies.get('__PAYSYS_TOKEN__');

  if (!token) return next();

  try {
    const decoded = await decodeToken<TokenType>(token);

    ctx.state.user = {
      id: decoded.id,
      username: decoded.username,
      admin: decoded.admin,
    };

    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 60 * 24 * 1) {
      const user = await getRepository(User).findOne({ id: decoded.id });

      if (!user) {
        return next();
      }

      const token = user.generateToken();

      setCookie(ctx, token);

      return next();
    }

    return next();
  } catch (err) {
    console.log(err);
    return next();
  }
}
