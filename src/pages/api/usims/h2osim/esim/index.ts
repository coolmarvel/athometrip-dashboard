import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '@/apis';
import { setValue } from '../../../redis';
import { checkExistingDataInRange, filterUsim, sortUsim } from '../../usim-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getH2OEsim(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const ticketName = 'h2o-esim';
const productName = 'h2o esim';
const url = 'http://localhost:3000/api/production/adapter/orders';

const getH2OEsim = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${ticketName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(ticketName, after, before);
    let usims: any = existingData ? existingData : [];

    if (usims.length === 0) {
      const { data } = await axios.get(`${url}?product_name=${productName}&start_date=${after}&end_date=${before}`);
      usims = await sortUsim(data, sort as RequiredKeysOf<any>, order as Order);

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
    return res.status(500).send({ data: null, message: 'Failed to get 911-memorial' });
  }
};
