import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '@/apis';
import { setValue } from '../../redis';
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

const productId = '406389,406413,406451,406786,406789,406791,406797,406803,408367';
const snapName = 'snap-modern';
const url = 'http://localhost:3000/api/adapter/orders';

const getModernsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${snapName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(snapName, after, before);
    let snaps: any = existingData ? existingData : [];

    if (snaps.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      await setValue(key, data);

      snaps = await filterSnap(snaps, after, before);
      snaps = await sortSnap(data, sort as RequiredKeysOf<any>, order as Order, search as string);
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
