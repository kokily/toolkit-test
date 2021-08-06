import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

export default async function setEmployee(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(User).update({ id }, { admin: false });

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
