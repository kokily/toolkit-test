import Joi from 'joi';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { serialize, validateBody } from '../../libs/utils';

export default async function register(ctx: Context) {
  type RequestType = {
    username: string;
    password: string;
  };

  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { username, password }: RequestType = ctx.request.body;

  try {
    const exists = await getRepository(User).findOne({ username });

    if (exists) {
      ctx.status = 409;
      ctx.body = {
        name: 'CONFLICT',
      };
      return;
    }

    let admin = false;

    if (
      username === process.env.ADMIN_NAME1 ||
      username === process.env.ADMIN_NAME2 ||
      username === process.env.ADMIN_NAME3 ||
      username === process.env.ADMIN_NAME4
    ) {
      admin = true;
    }

    const user = await getRepository(User).create({ username, admin });

    await user.setPassword(password);
    await user.save();

    ctx.body = serialize(user);
  } catch (err) {
    ctx.throw(500, err);
  }
}
