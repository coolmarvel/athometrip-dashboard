import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return get911Memorial(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '21772';
const ticketName = '911-memorial';
const url = 'http://localhost:3000/api/production/adapter/order';

const get911Memorial = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved 911-memorial ${id}` });
    else return res.status(200).send({ data: null, message: `911-memorial with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get 911-memorial ${id}` });
  }
};
