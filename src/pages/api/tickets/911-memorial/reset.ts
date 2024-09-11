import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return reset911Memorial(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = '911-memorial';

const reset911Memorial = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: `Successfully reset ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to reset ${ticketName}` });
  }
};
