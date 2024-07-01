import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetWashingtonDC(req, res);
    default:
      return res.status(405).end();
  }
}

const resetWashingtonDC = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset washington-dc posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset washington-dc posts' });
  }
};
