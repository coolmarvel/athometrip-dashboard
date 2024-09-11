import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetSummit(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'summit';

const resetSummit = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: `Successfully reset ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to reset ${ticketName}` });
  }
};
