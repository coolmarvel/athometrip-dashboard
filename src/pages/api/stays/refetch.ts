import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '../redis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchStays(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '2351,2384,3141,109359,110212,110362,110367,110369,114974,114976,131999,132365,387120';
const stayName = 'stays';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchStays = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${stayName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${stayName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${stayName}` });
  }
};
