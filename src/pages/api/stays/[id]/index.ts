import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getStay(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '2351,2384,3141,109359,110212,110362,110367,110369,114974,114976,131999,132365,387120';
const stayName = 'stays';
const url = 'http://localhost:3000/api/adapter/order';

const getStay = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${stayName} ${id}` });
    else return res.status(200).send({ data: null, message: `${stayName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${stayName} ${id}` });
  }
};
