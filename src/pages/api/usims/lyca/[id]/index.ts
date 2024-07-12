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

const productId = '80375,113901,125884,125889,125894,125899,127670,152531';
const usimName = 'lyca';
const url = 'http://localhost:3000/api/adapter/order';

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
