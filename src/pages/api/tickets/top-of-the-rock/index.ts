import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '../../types';
import { topOfTheRockStore, useTopOfTheRockStore } from '@/stores';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, cursor, limit } = req.query;
      if (page && limit) return getTopOfTheRockByPage(req, res);
      if (cursor && limit) return getTopOfTheRock(req, res);
      return getTopOfTheRock(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const getTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/2/108');

    return res.status(200).json({ data: result.data, message: 'Successfully retrieved top of the rocks' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get top of the rocks' });
  }
};

const getTopOfTheRockByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    if (topOfTheRockStore.getState().data.length === 0) {
      await topOfTheRockStore.getState().fetchData();
      const topOfTheRock = await topOfTheRockStore.getState().sortData(topOfTheRockStore.getState().data, sort as RequiredKeysOf<any>, order as Order);
      const slicedTopOfTheRock = topOfTheRock.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).json({ data: { total: topOfTheRock.length, data: slicedTopOfTheRock }, message: 'Successfully retrieved top of the rocks' });
    } else if (topOfTheRockStore.getState().data.length > 0) {
      const topOfTheRock = await topOfTheRockStore.getState().sortData(topOfTheRockStore.getState().data, sort as RequiredKeysOf<any>, order as Order);
      const slicedTopOfTheRock = topOfTheRock.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).json({ data: { total: topOfTheRock.length, data: slicedTopOfTheRock }, message: 'Successfully retrieved top of the rocks' });
    }
  } catch (error) {
    return res.status(500).json({ data: null, message: 'Failed to get top of the rocks' });
  }
};
