import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return updateTopOfTheRock(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'top-of-the-rock';
const url = process.env.NEXT_PUBLIC_API_URL;

const updateTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, double_check, memo } = req.body;

  try {
    const { data } = await axios.put(`${url}?order_id=${id}&double_check=${double_check}&memo=${memo}`);

    return res.status(200).send({ data: [], message: `Successfully update ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to update ${ticketName}` });
  }
};
