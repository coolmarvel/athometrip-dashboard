import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '@/pages/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchUNTour(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'un-tour';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_UN_TOUR as string;

const refetchUNTour = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${ticketName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${ticketName}` });
  }
};
