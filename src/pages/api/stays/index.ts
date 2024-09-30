import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '@/apis';
import { setValue } from '../redis';
import { OrderType } from '@/types';
import { checkExistingDataInRange, filterStay, sortStay } from './stay-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getStaysByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const stayName = 'stays';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_STAYS as string;

const getStaysByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${stayName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(stayName, after, before);
    let stays: any = existingData ? existingData : [];

    if (stays.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      data.map((v: OrderType) => (v.id = parseInt(v.order.id, 10)));
      await setValue(key, data);

      stays = await filterStay(data, after, before);
      stays = await sortStay(stays, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedStays = stays.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: stays.length, data: slicedStays } });
    } else {
      stays = await filterStay(stays, after, before);
      stays = await sortStay(stays, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedStays = stays.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: stays.length, data: slicedStays } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${stayName}` });
  }
};
