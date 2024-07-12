import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '@/apis';
import { setValue } from '../../redis';
import { checkExistingDataInRange, filterUsim, sortUsim } from '../usim-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getTMobileByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const productId = '126173,196976,197555,255271';
const usimName = 't-mobile';
const url = 'http://localhost:3000/api/adapter/orders';

const getTMobileByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, region, mode, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${usimName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(usimName, after, before);
    let usims: any = existingData ? existingData : [];

    if (usims.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      await setValue(key, data);

      usims = await filterUsim(usims, after, before, region, mode);
      usims = await sortUsim(data, sort as RequiredKeysOf<any>, order as Order, search);
      const slicedUsims = usims.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: usims.length, data: slicedUsims } });
    } else {
      usims = await filterUsim(usims, after, before, region, mode);
      usims = await sortUsim(usims, sort as RequiredKeysOf<any>, order as Order, search);
      const slicedUsims = usims.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: usims.length, data: slicedUsims } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${usimName}` });
  }
};
