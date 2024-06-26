import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetLandmark(req, res);
    default:
      return res.status(405).end();
  }
}

const resetLandmark = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset landmark posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset landmark posts' });
  }
};
