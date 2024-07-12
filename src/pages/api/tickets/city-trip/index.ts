import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getCityTripByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const ticketName = 'city-trip';
const url = 'http://localhost:3000/api/adapter/orders';

const getCityTripByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${ticketName}_${after}_${before}`;

  try {
    return res.status(200).send({ data: { total: 0, data: [] } });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to get city-trip' });
  }
};
