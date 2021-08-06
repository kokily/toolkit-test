import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { serialize } from '../../libs/utils';

export default async function initPassword(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    const user = await getRepository(User).findOne(id);

    if (!user) {
      ctx.status = 401;
      return;
    }

    await user.setPassword(process.env.BASE_PASSWORD!);
    await user.save();

    ctx.body = serialize(user);
  } catch (err) {
    ctx.throw(500, err);
  }
}
