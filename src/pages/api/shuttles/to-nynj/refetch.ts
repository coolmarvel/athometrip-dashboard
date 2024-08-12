import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '../../redis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchToNYNJ(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '143688,144281,411754,446790,447602,447618';
const shuttleName = 'to-nynj';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchToNYNJ = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${shuttleName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${shuttleName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${shuttleName}` });
  }
};
