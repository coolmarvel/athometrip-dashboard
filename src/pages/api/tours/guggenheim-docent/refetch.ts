import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '@/pages/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchGuggenheimDocent(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '76716';
const tourName = 'guggenheim-docent';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchGuggenheimDocent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${tourName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${tourName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${tourName}` });
  }
};
