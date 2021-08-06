import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default async function setAdmin(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(User).update({ id }, { admin: true });

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
