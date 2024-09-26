import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '@/pages/api';
import { OrderType } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchToJFK(req, res);
    default:
      return res.status(405).end();
  }
}

const shuttleName = 'to-jfk';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_TO_JFK as string;

const refetchToJFK = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${shuttleName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    data.map((v: OrderType) => (v.id = parseInt(v.order.id, 10)));
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${shuttleName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${shuttleName}` });
  }
};
