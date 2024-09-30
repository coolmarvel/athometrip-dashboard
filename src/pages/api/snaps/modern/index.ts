import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '@/apis';
import { OrderType } from '@/types';
import { setValue } from '@/pages/api';
import { checkExistingDataInRange, filterSnap, sortSnap } from '../snap-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getModernsByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const snapName = 'snap-modern';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_MODERN as string;

const getModernsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${snapName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(snapName, after, before);
    let snaps: any = existingData ? existingData : [];

    if (snaps.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      data.map((v: OrderType) => (v.id = parseInt(v.order.id, 10)));
      await setValue(key, data);

      snaps = await filterSnap(data, after, before);
      snaps = await sortSnap(snaps, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedSnaps = snaps.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: snaps.length, data: slicedSnaps } });
    } else {
      snaps = await filterSnap(snaps, after, before);
      snaps = await sortSnap(snaps, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedSnaps = snaps.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: snaps.length, data: slicedSnaps } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${snapName}` });
  }
};
