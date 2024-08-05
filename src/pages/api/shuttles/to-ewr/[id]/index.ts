import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getToEWR(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '242502,242570';
const shuttleName = 'to-ewr';
const url = process.env.NEXT_PUBLIC_API_URL;

const getToEWR = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${shuttleName} ${id}` });
    else return res.status(200).send({ data: null, message: `${shuttleName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${shuttleName} ${id}` });
  }
};
