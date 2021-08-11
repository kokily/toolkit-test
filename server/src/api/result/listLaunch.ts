import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Bill } from '../../entities/Bill';

export default async function listLaunch(ctx: Context) {
  try {
    type LaunchType = {
      title: string;
      native: string;
      name: string;
      price: number;
      count: number;
      amount: number;
      created_at: Date;
    };

    const list = await getManager()
      .createQueryBuilder(Bill, 'bills')
      .orderBy('bills.created_at', 'ASC');
    const target = await list.getMany();

    let launches: LaunchType[] = [];

    for (let i = 0; i < target.length; i++) {
      for (let j = 0; j < target[i].items.length; j++) {
        if (target[i].items[j].name === '도시락') {
          const item = {
            title: target[i].title,
            native: target[i].items[j].native,
            name: target[i].items[j].name,
            price: target[i].items[j].price,
            count: target[i].items[j].count,
            amount: target[i].items[j].amount,
            created_at: target[i].created_at,
          };

          launches.push(item);
        }
      }
    }

    const salmons = launches.filter((data) => data.price === 30000);
    const eels = launches.filter((data) => data.price === 25000);
    const fleshes = launches.filter((data) => data.price === 20000);

    let salmon = {
      count: 0,
      amount: 0,
    };

    let eel = {
      count: 0,
      amount: 0,
    };

    let flesh = {
      count: 0,
      amount: 0,
    };

    salmons.map((data) => {
      salmon.count += data.count;
      salmon.amount += data.amount;
    });

    eels.map((data) => {
      eel.count += data.count;
      eel.amount += data.amount;
    });

    fleshes.map((data) => {
      flesh.count += data.count;
      flesh.amount += data.amount;
    });

    ctx.body = {
      launches,
      salmon,
      eel,
      flesh,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
}
