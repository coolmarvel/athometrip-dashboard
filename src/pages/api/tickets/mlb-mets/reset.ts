import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetMLBMets(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/mlb-mets/reset
const resetMLBMets = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset mlb-mets posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset mlb-mets posts' });
  }
};
