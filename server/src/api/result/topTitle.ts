import Joi from 'joi';
import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Bill } from '../../entities/Bill';
import { getSortedList } from '../../libs/statistics';
import { validateBody } from '../../libs/utils';

export default async function topTitle(ctx: Context) {
  type RequestType = {
    start_date: Date;
    end_date: Date;
  };

  const schema = Joi.object().keys({
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { start_date, end_date }: RequestType = ctx.request.body;

  try {
    const query = await getManager()
      .createQueryBuilder(Bill, 'bills')
      .where(
        'bills.created_at >= :start_date AND bills.created_at <= :end_date',
        {
          start_date,
          end_date,
        }
      );

    const list = await query.getMany();

    if (list.length < 1) {
      ctx.status = 404;
      return;
    }

    const titles = getSortedList(list).slice(0, 19);

    ctx.body = titles;
  } catch (err) {
    ctx.throw(500, err);
  }
}
