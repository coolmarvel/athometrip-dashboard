import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getModern(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '406389,406413,406451,406786,406789,406791,406797,406803,408367';
const snapName = 'snap-modern';
const url = 'http://localhost:3000/api/adapter/order';

const getModern = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${snapName} ${id}` });
    else return res.status(200).send({ data: null, message: `${snapName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${snapName} ${id}` });
  }
};
