import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getToNYNJEWR(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '242462,242560,446795';
const shuttleName = 'to-nynj-ewr';
const url = 'http://localhost:3000/api/adapter/order';

const getToNYNJEWR = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${shuttleName} ${id}` });
    else return res.status(200).send({ data: null, message: `${shuttleName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${shuttleName} ${id}` });
  }
};
