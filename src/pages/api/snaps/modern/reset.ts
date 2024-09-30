import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetModern(req, res);
    default:
      return res.status(405).end();
  }
}

const snapName = 'snap-modern';

const resetModern = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: `Successfully reset ${snapName} posts` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to reset ${snapName} posts` });
  }
};
