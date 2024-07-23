import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMusical(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '484,486,487,489,4387,30005,56960,98460,98932,99152,128657';
const musicalName = 'musicals';
const url = 'http://localhost:3000/api/adapter/order';

const getMusical = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${musicalName} ${id}` });
    else return res.status(200).send({ data: null, message: `${musicalName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${musicalName} ${id}` });
  }
};
