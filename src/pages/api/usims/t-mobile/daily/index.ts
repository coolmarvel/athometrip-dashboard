import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '@/apis';
import { setValue } from '../../../redis';
import { checkExistingDataInRange, filterUsim, sortUsim } from '../../usim-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getTMobileDaily(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

// const productName = ['티 모바일 LTE 무제한 데일리', '티모바일 usim/esim 연장 상품'];
const usimName = 't-mobile-daily';
const categoryIds = ['87,105', '31,87,104', '31,103,115'];
const url = 'http://localhost:3000/api/production/adapter/orders';

const getTMobileDaily = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${usimName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(usimName, after, before);
    let usims: any = existingData ? existingData : [];

    if (usims.length === 0) {
      const datas = [];
      for (let i = 0; i < categoryIds.length; i++) {
        const { data } = await axios.get(`${url}?category_id=${categoryIds[i]}&after=${after}&before=${before}`);
        datas.push(...data);
      }
      usims = await sortUsim(datas, sort as RequiredKeysOf<any>, order as Order);

      await setValue(key, usims);

      const slicedUsims = usims.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: usims.length, data: slicedUsims } });
    } else {
      usims = await filterUsim(usims, after, before);
      usims = await sortUsim(usims, sort as RequiredKeysOf<any>, order as Order);
      const slicedUsims = usims.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: usims.length, data: slicedUsims } });
    }
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to get t-mobile-daily' });
  }
};