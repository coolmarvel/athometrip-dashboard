import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetWhitneyDocent(req, res);
    default:
      return res.status(405).end();
  }
}

const tourName = 'whitney-docent';

const resetWhitneyDocent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: `Successfully reset ${tourName} posts` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to reset ${tourName} posts` });
  }
};
