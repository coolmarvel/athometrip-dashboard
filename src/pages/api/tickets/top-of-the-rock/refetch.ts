import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '../../redis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchTopOfTheRock(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '21729,406803,444816';
const ticketName = 'top-of-the-rock';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${ticketName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: 'Successfully refetch top-of-the-rock posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to refetch top-of-the-rock posts' });
  }
};
