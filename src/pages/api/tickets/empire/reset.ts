import { NextApiRequest, NextApiResponse } from 'next';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetEmpire(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/empire/reset
const resetEmpire = async (req: NextApiRequest, res: NextApiResponse) => {
  let tickets = ticketStore.tickets;

  try {
    tickets = [];

    return res.status(200).send({ data: [], message: 'Successfully reset empire posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset empire posts' });
  }
};
