import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '@/pages/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchLyca(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '80375,113901,125884,125889,125894,125899,127670,152531';
const usimName = 'lyca';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchLyca = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${usimName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${usimName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${usimName}` });
  }
};
