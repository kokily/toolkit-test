import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Wedding } from '../../entities/wedding';

export default async function removeSign(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(Wedding).update(
      { id },
      { husband_image: '', bride_image: '' }
    );

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
