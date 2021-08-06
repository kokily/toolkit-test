import { Context, Next } from 'koa';
import Joi, { SchemaLike } from 'joi';
import { User } from '../entities/User';

export function validateBody(ctx: Context, schema: SchemaLike) {
  const validation = Joi.valid(ctx.request.body, schema);

  if (Joi.isError(validation)) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: validation.error,
    };

    return false;
  }

  return true;
}

export function serialize(user: User) {
  const data = user;
  delete data.password;
  return data;
}

export function isLoggedIn(ctx: Context, next: Next) {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 403;
    ctx.body = {
      name: 'NOT_PERMISSION',
    };
    return;
  }

  return next();
}

export function isAdminIn(ctx: Context, next: Next) {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 403;
    ctx.body = {
      name: 'NOT_PERMISSION',
    };
    return;
  }

  if (
    user.username !== process.env.ADMIN1 &&
    user.username !== process.env.ADMIN2 &&
    user.username !== process.env.ADMIN3 &&
    user.username !== process.env.ADMIN4
  ) {
    ctx.status = 403;
    ctx.body = {
      name: 'NOT_PERMISSION',
    };
    return;
  }

  return next();
}
