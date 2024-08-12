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

const productId = '484,486,487,489,4387,30005,56960,98460,98932,99152,128657';
const musicalName = 'musicals';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchStays = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${musicalName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${musicalName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${musicalName}` });
  }
};
