import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetTMobileDaily(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/t-mobile/daily/reset
const resetTMobileDaily = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset t-mobile-daily posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset t-mobile-daily posts' });
  }
};
