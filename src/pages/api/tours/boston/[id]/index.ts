import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getBoston(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '90443,169052,169088';
const tourName = 'boston';
const url = 'http://localhost:3000/api/production/adapter/order';

const getBoston = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${tourName} ${id}` });
    else return res.status(200).send({ data: null, message: `${tourName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${tourName} ${id}` });
  }
};
