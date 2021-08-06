import Joi from 'joi';
import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { Bill } from '../../entities/Bill';
import { validateBody } from '../../libs/utils';

export default async function listBills(ctx: Context) {
  type RequestType = {
    cursor?: string;
    user_id?: string;
    title?: string;
    hall?: string;
  };

  const schema = Joi.object().keys({
    cursor: Joi.string(),
    user_id: Joi.string(),
    title: Joi.string(),
    hall: Joi.string(),
  });

  if (!validateBody(ctx, schema)) return;

  const { cursor, user_id, title, hall }: RequestType = ctx.request.body;

  try {
    const query = await getManager()
      .createQueryBuilder(Bill, 'bills')
      .limit(20)
      .orderBy('bills.created_at', 'DESC')
      .addOrderBy('bills.id', 'DESC');

    if (user_id) {
      query.andWhere('bills.user_id = :user_id', { user_id });
    }

    if (title) {
      query.andWhere('bills.title like :title', {
        title: `%${title}%`,
      });
    }

    if (hall) {
      query.andWhere('bills.hall = :hall', { hall });
    }

    if (cursor) {
      const bill = await getRepository(Bill).findOne({ id: cursor });

      if (!bill) {
        ctx.status = 404;
        return;
      }

      query.andWhere('bills.created_at < :date', {
        date: bill.created_at,
      });

      query.orWhere('bills.created_at = :date AND bills.id < id', {
        date: bill.created_at,
        id: bill.id,
      });
    }

    const bills = await query.getMany();

    ctx.body = bills;
  } catch (err) {
    ctx.throw(500, err);
  }
}
