import Joi from 'joi';
import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { Wedding } from '../../entities/wedding';
import { validateBody } from '../../libs/utils';

export default async function listWeddings(ctx: Context) {
  type RequestType = {
    cursor?: string;
    date?: string;
  };

  const schema = Joi.object().keys({
    cursor: Joi.string(),
    date: Joi.string(),
  });

  if (!validateBody(ctx, schema)) return;

  const { cursor, date }: RequestType = ctx.request.body;

  try {
    const query = await getManager()
      .createQueryBuilder(Wedding, 'weddings')
      .limit(20)
      .orderBy('weddings.created_at', 'DESC')
      .addOrderBy('weddings.id', 'DESC');

    if (date) {
      query.andWhere('weddings.wedding_at like :date', {
        date: `%${date}%`,
      });
    }

    if (cursor) {
      const wedding = await getRepository(Wedding).findOne({ id: cursor });

      if (!wedding) {
        ctx.status = 404;
        return;
      }

      query.andWhere('weddings.created_at < :date', {
        date: wedding.created_at,
      });

      query.orWhere('weddings.created_at = :date AND weddings.id < :id', {
        date: wedding.created_at,
        id: wedding.id,
      });
    }

    const weddings = await query.getMany();

    ctx.body = weddings;
  } catch (err) {
    ctx.throw(500, err);
  }
}
