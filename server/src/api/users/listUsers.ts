import Joi from 'joi';
import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { validateBody } from '../../libs/utils';

export default async function listUsers(ctx: Context) {
  type RequestType = {
    cursor?: string;
    username?: string;
  };

  const schema = Joi.object().keys({
    cursor: Joi.string(),
    username: Joi.string(),
  });

  if (!validateBody(ctx, schema)) return;

  const { cursor, username }: RequestType = ctx.request.body;

  try {
    const query = await getManager()
      .createQueryBuilder(User, 'users')
      .limit(30)
      .orderBy('users.created_at', 'DESC')
      .addOrderBy('users.id', 'DESC');

    if (username) {
      query.andWhere('users.username like :username', {
        username: `%${username}%`,
      });
    }

    if (cursor) {
      const user = await getRepository(User).findOne({ id: cursor });

      if (!user) {
        ctx.status = 404;
        return;
      }

      query.andWhere('users.created_at < :date', {
        date: user.created_at,
      });

      query.orWhere('users.created_at = :date AND users.id < :id', {
        date: user.created_at,
        id: user.id,
      });
    }

    const users = await query.getMany();

    ctx.body = users;
  } catch (err) {
    ctx.throw(500, err);
  }
}
