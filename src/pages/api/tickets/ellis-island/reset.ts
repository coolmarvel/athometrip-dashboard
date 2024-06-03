import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetEllisIsland(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/ellis-island/reset
const resetEllisIsland = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset ellis-island posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset ellis-island posts' });
  }
};
