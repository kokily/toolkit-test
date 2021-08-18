import { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import { User } from '../../entities/User';
import { serialize, validateBody } from '../../libs/utils';
import { setCookie } from '../../libs/auth';

export default async function login(ctx: Context) {
  type RequestBody = {
    username: string;
    password: string;
  };

  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { username, password }: RequestBody = ctx.request.body;

  try {
    const user = await getRepository(User).findOne({ username });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        name: 'DOES_NOT_EXISTS_USER',
      };
      return;
    }

    const valid = await user.validPassword(password);

    if (!valid) {
      ctx.status = 401;
      ctx.body = {
        name: 'BAD_PASSWORD',
      };
      return;
    }

    const token = user.generateToken();

    setCookie(ctx, token);

    ctx.body = serialize(user);
  } catch (err) {
    ctx.throw(500, err);
  }
}
