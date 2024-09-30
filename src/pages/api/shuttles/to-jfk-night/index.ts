import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '@/apis';
import { OrderType } from '@/types';
import { setValue } from '@/pages/api';
import { checkExistingDataInRange, filterShuttle, sortShuttle } from '../shuttle-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getToJFKNightsByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const shuttleName = 'to-jfk';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_TO_JFK_NIGHT as string;

const getToJFKNightsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${shuttleName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(shuttleName, after, before);
    let shuttles: any = existingData ? existingData : [];

    if (shuttles.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      data.map((v: OrderType) => (v.id = parseInt(v.order.id, 10)));
      await setValue(key, data);

      shuttles = await filterShuttle(data, after, before, false);
      shuttles = await sortShuttle(shuttles, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedshuttles = shuttles.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: shuttles.length, data: slicedshuttles } });
    } else {
      shuttles = await filterShuttle(shuttles, after, before, false);
      shuttles = await sortShuttle(shuttles, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedshuttles = shuttles.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: shuttles.length, data: slicedshuttles } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${shuttleName}` });
  }
};
