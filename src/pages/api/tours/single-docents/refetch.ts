import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '@/pages/api';
import { OrderType } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchSingleDocents(req, res);
    default:
      return res.status(405).end();
  }
}

const tourName = 'single-docents';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_SINGLE_DOCENTS as string;

const refetchSingleDocents = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${tourName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    data.map((v: OrderType) => (v.id = parseInt(v.order.id, 10)));
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${tourName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${tourName}` });
  }
};
