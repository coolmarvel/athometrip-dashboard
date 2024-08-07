import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetVintage(req, res);
    default:
      return res.status(405).end();
  }
}

const resetVintage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset snap-vintage posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset snap-vintage posts' });
  }
};
