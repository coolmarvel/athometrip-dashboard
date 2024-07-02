import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '@/apis';
import { setValue } from '../../redis';
import { checkExistingDataInRange, filterTour, sortTour } from '../tour-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getBostonByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const productId = '90443,169052,169088';
const tourName = 'boston';
const url = 'http://localhost:3000/api/production/adapter/orders';

const getBostonByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${tourName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(tourName, after, before);
    let tours: any = existingData ? existingData : [];

    if (tours.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      await setValue(key, data);

      tours = await sortTour(data, sort as RequiredKeysOf<any>, order as Order, search as string);

      const slicedTours = tours.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tours.length, data: slicedTours } });
    } else {
      tours = await sortTour(tours, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedTours = tours.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tours.length, data: slicedTours } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${tourName}` });
  }
};
