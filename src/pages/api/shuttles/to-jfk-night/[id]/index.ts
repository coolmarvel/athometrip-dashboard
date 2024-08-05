import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getToJFKNight(req, res);
    default:
      return res.status(405).end();
  }
}

const productId = '143692,144284,411756,447600,447604,447614';
const shuttleName = 'to-jfk';
const url = process.env.NEXT_PUBLIC_API_URL;

const getToJFKNight = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${shuttleName} ${id}` });
    else return res.status(200).send({ data: null, message: `${shuttleName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${shuttleName} ${id}` });
  }
};
