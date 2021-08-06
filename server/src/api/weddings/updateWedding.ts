import Joi from 'joi';
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
import { maskingName, validateBody } from '../../libs/utils';

export default async function updateWedding(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  type RequestType = {
    husband_name: string;
    bride_name: string;
    wedding_at: string;
    event_at: string;
    company_husband: number;
    company_bride: number;
    rooftop_husband: number;
    rooftop_bride: number;
    owner_woman_husband: number;
    owner_woman_bride: number;
    owner_man_husband: number;
    owner_man_bride: number;
    select_husband: number;
    select_bride: number;
    frame_husband: number;
    frame_bride: number;
    dress_husband: number;
    dress_bride: number;
    hairpin_husband: number;
    hairpin_bride: number;
    wig_husband: number;
    wig_bride: number;
    video_husband: number;
    video_bride: number;
    etc_husband: number;
    etc_bride: number;
    rental_husband: number;
    rental_bride: number;
    sword_husband: number;
    sword_bride: number;
    glove_husband: number;
    glove_bride: number;
    bouquet_husband: number;
    bouquet_bride: number;
    ceremony_husband: number;
    ceremony_bride: number;
    play_husband: number;
    play_bride: number;
    anthem_husband: number;
    anthem_bride: number;
    moderator_husband: number;
    moderator_bride: number;
    officiate_husband: number;
    officiate_bride: number;
    hanbok_pre_husband: number;
    hanbok_pre_bride: number;
    hanbok_post_husband: number;
    hanbok_post_bride: number;
    meals: string;
    meals_price: number;
    meals_num_husband: number;
    meals_num_bride: number;
    present: string;
    present_price: number;
    present_num_husband: number;
    present_num_bride: number;
    reserve: string;
    reserve_pay: number;
    cost_husband: number;
    cost_bride: number;
    meal_husband: number;
    meal_bride: number;
    present_husband: number;
    present_bride: number;
    reserve_husband: number;
    reserve_bride: number;
  };

  const schema = Joi.object().keys({
    husband_name: Joi.string().required(),
    bride_name: Joi.string().required(),
    wedding_at: Joi.string().required(),
    event_at: Joi.string().required(),
    company_husband: Joi.number().required(),
    company_bride: Joi.number().required(),
    rooftop_husband: Joi.number().required(),
    rooftop_bride: Joi.number().required(),
    owner_woman_husband: Joi.number().required(),
    owner_woman_bride: Joi.number().required(),
    owner_man_husband: Joi.number().required(),
    owner_man_bride: Joi.number().required(),
    select_husband: Joi.number().required(),
    select_bride: Joi.number().required(),
    frame_husband: Joi.number().required(),
    frame_bride: Joi.number().required(),
    dress_husband: Joi.number().required(),
    dress_bride: Joi.number().required(),
    hairpin_husband: Joi.number().required(),
    hairpin_bride: Joi.number().required(),
    wig_husband: Joi.number().required(),
    wig_bride: Joi.number().required(),
    video_husband: Joi.number().required(),
    video_bride: Joi.number().required(),
    etc_husband: Joi.number().required(),
    etc_bride: Joi.number().required(),
    rental_husband: Joi.number().required(),
    rental_bride: Joi.number().required(),
    sword_husband: Joi.number().required(),
    sword_bride: Joi.number().required(),
    glove_husband: Joi.number().required(),
    glove_bride: Joi.number().required(),
    bouquet_husband: Joi.number().required(),
    bouquet_bride: Joi.number().required(),
    ceremony_husband: Joi.number().required(),
    ceremony_bride: Joi.number().required(),
    play_husband: Joi.number().required(),
    play_bride: Joi.number().required(),
    anthem_husband: Joi.number().required(),
    anthem_bride: Joi.number().required(),
    moderator_husband: Joi.number().required(),
    moderator_bride: Joi.number().required(),
    officiate_husband: Joi.number().required(),
    officiate_bride: Joi.number().required(),
    hanbok_pre_husband: Joi.number().required(),
    hanbok_pre_bride: Joi.number().required(),
    hanbok_post_husband: Joi.number().required(),
    hanbok_post_bride: Joi.number().required(),
    meals: Joi.string().required(),
    meals_price: Joi.number().required(),
    meals_num_husband: Joi.number().required(),
    meals_num_bride: Joi.number().required(),
    present: Joi.string().required(),
    present_price: Joi.number().required(),
    present_num_husband: Joi.number().required(),
    present_num_bride: Joi.number().required(),
    reserve: Joi.string().required(),
    reserve_pay: Joi.number().required(),
    cost_husband: Joi.number().required(),
    cost_bride: Joi.number().required(),
    meal_husband: Joi.number().required(),
    meal_bride: Joi.number().required(),
    present_husband: Joi.number().required(),
    present_bride: Joi.number().required(),
    reserve_husband: Joi.number().required(),
    reserve_bride: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const {
    husband_name,
    bride_name,
    wedding_at,
    event_at,
    company_husband,
    company_bride,
    rooftop_husband,
    rooftop_bride,
    owner_woman_husband,
    owner_woman_bride,
    owner_man_husband,
    owner_man_bride,
    select_husband,
    select_bride,
    frame_husband,
    frame_bride,
    dress_husband,
    dress_bride,
    hairpin_husband,
    hairpin_bride,
    wig_husband,
    wig_bride,
    video_husband,
    video_bride,
    etc_husband,
    etc_bride,
    rental_husband,
    rental_bride,
    sword_husband,
    sword_bride,
    glove_husband,
    glove_bride,
    bouquet_husband,
    bouquet_bride,
    ceremony_husband,
    ceremony_bride,
    play_husband,
    play_bride,
    anthem_husband,
    anthem_bride,
    moderator_husband,
    moderator_bride,
    officiate_husband,
    officiate_bride,
    hanbok_pre_husband,
    hanbok_pre_bride,
    hanbok_post_husband,
    hanbok_post_bride,
    meals,
    meals_price,
    meals_num_husband,
    meals_num_bride,
    present,
    present_price,
    present_num_husband,
    present_num_bride,
    reserve,
    reserve_pay,
    cost_husband,
    cost_bride,
    meal_husband,
    meal_bride,
    present_husband,
    present_bride,
    reserve_husband,
    reserve_bride,
  }: RequestType = ctx.request.body;

  try {
    await getRepository(Wedding).update(
      { id },
      {
        husband_name: maskingName(husband_name),
        bride_name: maskingName(bride_name),
        wedding_at,
        event_at,
        cost_husband,
        cost_bride,
        meal_husband,
        meal_bride,
        present_husband,
        present_bride,
        reserve_husband,
        reserve_bride,
      }
    );

    await getRepository(Convention).update(
      { weddingId: id },
      {
        rental_husband,
        rental_bride,
        sword_husband,
        sword_bride,
        glove_husband,
        glove_bride,
        bouquet_husband,
        bouquet_bride,
        ceremony_husband,
        ceremony_bride,
      }
    );

    await getRepository(Company).update(
      { weddingId: id },
      {
        company_husband,
        company_bride,
        rooftop_husband,
        rooftop_bride,
        owner_woman_husband,
        owner_woman_bride,
        owner_man_husband,
        owner_man_bride,
        select_husband,
        select_bride,
        frame_husband,
        frame_bride,
        dress_husband,
        dress_bride,
        hairpin_husband,
        hairpin_bride,
        wig_husband,
        wig_bride,
        video_husband,
        video_bride,
        etc_husband,
        etc_bride,
      }
    );

    await getRepository(Hanbok).update(
      { weddingId: id },
      {
        hanbok_pre_husband,
        hanbok_pre_bride,
        hanbok_post_husband,
        hanbok_post_bride,
      }
    );

    await getRepository(Event).update(
      { weddingId: id },
      {
        play_husband,
        play_bride,
        anthem_husband,
        anthem_bride,
        moderator_husband,
        moderator_bride,
        officiate_husband,
        officiate_bride,
      }
    );

    await getRepository(Meal).update(
      { weddingId: id },
      {
        meals,
        meals_price,
        meals_num_husband,
        meals_num_bride,
      }
    );

    await getRepository(Present).update(
      { weddingId: id },
      {
        present,
        present_price,
        present_num_husband,
        present_num_bride,
      }
    );

    await getRepository(Reserve).update(
      { weddingId: id },
      {
        reserve,
        reserve_pay,
      }
    );

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500, err);
  }
}
