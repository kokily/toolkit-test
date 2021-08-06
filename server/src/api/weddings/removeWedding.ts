import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Wedding } from '../../entities/wedding';
import { Convention } from '../../entities/wedding/Convention';
import { Company } from '../../entities/wedding/Company';
import { Hanbok } from '../../entities/wedding/Hanbok';
import { Event } from '../../entities/wedding/Event';
import { Meal } from '../../entities/wedding/Meal';
import { Present } from '../../entities/wedding/Present';
import { Reserve } from '../../entities/wedding/Reserve';

export default async function removeWedding(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(Wedding).delete(id);
    await getRepository(Convention).delete({ weddingId: id });
    await getRepository(Company).delete({ weddingId: id });
    await getRepository(Hanbok).delete({ weddingId: id });
    await getRepository(Event).delete({ weddingId: id });
    await getRepository(Meal).delete({ weddingId: id });
    await getRepository(Present).delete({ weddingId: id });
    await getRepository(Reserve).delete({ weddingId: id });

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
