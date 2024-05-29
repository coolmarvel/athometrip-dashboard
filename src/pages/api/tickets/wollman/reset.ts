import { NextApiRequest, NextApiResponse } from 'next';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetWollman(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/wollman/reset
const resetWollman = async (req: NextApiRequest, res: NextApiResponse) => {
  let tickets = ticketStore.tickets;

  try {
    tickets = [];

    return res.status(200).send({ data: [], message: 'Successfully reset wollman posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset wollman posts' });
  }
};
