import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Wedding } from '../../entities/wedding';
import { Company } from '../../entities/wedding/Company';
import { Convention } from '../../entities/wedding/Convention';
import { Event } from '../../entities/wedding/Event';
import { Hanbok } from '../../entities/wedding/Hanbok';
import { Meal } from '../../entities/wedding/Meal';
import { Present } from '../../entities/wedding/Present';
import { Reserve } from '../../entities/wedding/Reserve';

export default async function readWedding(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  try {
    const wedding = await getRepository(Wedding).findOne(id);
    const convention = await getRepository(Convention).findOne({
      weddingId: id,
    });
    const company = await getRepository(Company).findOne({ weddingId: id });
    const hanbok = await getRepository(Hanbok).findOne({ weddingId: id });
    const event = await getRepository(Event).findOne({ weddingId: id });
    const meal = await getRepository(Meal).findOne({ weddingId: id });
    const present = await getRepository(Present).findOne({ weddingId: id });
    const reserve = await getRepository(Reserve).findOne({ weddingId: id });

    if (
      !wedding ||
      !convention ||
      !company ||
      !hanbok ||
      !event ||
      !meal ||
      !present ||
      !reserve
    ) {
      ctx.status = 404;
      return;
    }

    ctx.body = {
      wedding,
      convention,
      company,
      hanbok,
      event,
      meal,
      present,
      reserve,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
}
