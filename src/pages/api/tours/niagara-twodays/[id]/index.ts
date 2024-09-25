import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getNiagaraTwoDays(req, res);
    default:
      return res.status(405).end();
  }
}

const tourName = 'niagara-oneday-twodays';
const url = process.env.NEXT_PUBLIC_API_URL as string;
const productId = process.env.NEXT_PUBLIC_NIAGARA_TWODAYS as string;

const getNiagaraTwoDays = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(`${url}?product_id=${productId}&order_id=${id}`);

    if (data) return res.status(200).send({ data: data, message: `Successfully retrieved ${tourName} ${id}` });
    else return res.status(200).send({ data: null, message: `${tourName} with ID ${id} not found` });
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get ${tourName} ${id}` });
  }
};
