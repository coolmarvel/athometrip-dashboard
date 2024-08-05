import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getVintage(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '400198,406254,406273,406279,406551,406557,406631,406634,406747,408224,408287';
const snapName = 'snap-vintage';
const url = process.env.NEXT_PUBLIC_API_URL;

const getVintage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${snapName} ${id}` });
    else return res.status(200).send({ data: null, message: `${snapName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${snapName} ${id}` });
  }
};
