import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '@/apis';
import { setValue } from '../redis';
import { OrderType } from '@/types';
import { checkExistingDataInRange, filterMusical, sortMusical } from './musical-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getMusicalsByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const musicalName = 'musicals';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_MUSICALS as string;

const getMusicalsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${musicalName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(musicalName, after, before);
    let musicals: any = existingData ? existingData : [];

    if (musicals.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      data.map((v: OrderType) => (v.id = parseInt(v.order.id, 10)));
      await setValue(key, data);

      musicals = await filterMusical(data, after, before);
      musicals = await sortMusical(musicals, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedMusicals = musicals.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: musicals.length, data: slicedMusicals } });
    } else {
      musicals = await filterMusical(musicals, after, before);
      musicals = await sortMusical(musicals, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedMusicals = musicals.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: musicals.length, data: slicedMusicals } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${musicalName}` });
  }
};
