import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getLyca(req, res);
    default:
      return res.status(405).end();
  }
}

const usimName = 'lyca';
const url = process.env.NEXT_PUBLIC_API_URL as string;
const productId = process.env.NEXT_PUBLIC_LYCA as string;

const getLyca = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${usimName} ${id}` });
    else return res.status(200).send({ data: null, message: `${usimName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${usimName} ${id}` });
  }
};
