import aligo from 'aligoapi';
import { Context } from 'koa';

export default function sendSms(
  ctx: Context,
  username: string,
  title: string,
  hall: string
) {
  const smsConfig = {
    key: process.env.ALIGO_KEY,
    user_id: process.env.ALIGO_USER,
  };

  const sender = process.env.ALIGO_SENDER;
  const receiver =
    process.env.NODE_ENV === 'production'
      ? `${process.env.ALIGO_RECEIVER1},${process.env.ALIGO_RECEIVER2},${process.env.ALIGO_RECEIVER3},${process.env.ALIGO_RECEIVER4}`
      : `${process.env.ALIGO_RECEIVER1}`;

  ctx.request.body = {
    sender,
    receiver,
    msg: `[${username}]님 [${hall}에서] [${title}] 전표전송 https://paysys.shop/fronts`,
  };

  aligo
    .send(ctx.request, smsConfig)
    .then((r) => console.log(r))
    .catch((err) => console.log(err));

  ctx.status = 200;
}
