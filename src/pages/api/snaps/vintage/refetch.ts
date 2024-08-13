import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { setValue } from '../../redis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchVintage(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '400198,406254,406273,406279,406551,406557,406631,406634,406747,408224,408287';
const snapName = 'snap-vintage';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchVintage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { after, before } = req.body as { [key: string]: string };

  const key = `${snapName}_${after}_${before}`;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully refetch ${snapName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${snapName}` });
  }
};