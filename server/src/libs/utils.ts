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

  if (!user.admin) {
    ctx.status = 403;
    ctx.body = {
      name: 'NOT_PERMISSION',
    };
    return;
  }

  return next();
}

export function cleanAllNullArgs(args: object): object {
  const notNull = {};

  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });

  return notNull;
}

export function maskingName(name: string): string {
  if (name.length > 2) {
    let originalName = name.split('');

    originalName.forEach((name, i) => {
      if (i === 0 || i === originalName.length - 1) return;

      originalName[i] = '*';
    });

    let combineName = originalName.join();

    return combineName.replace(/,/g, '');
  } else {
    return name.replace(/.$/, '*');
  }
}
