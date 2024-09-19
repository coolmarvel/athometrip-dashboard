import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '@/pages/api';
import { OrderType } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchEmpire(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'empire';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_EMPIRE as string;

const refetchEmpire = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${ticketName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    data.map((v: OrderType) => v.id = parseInt(v.order.id, 10));
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${ticketName}` });
  }
};
