import { NextApiRequest, NextApiResponse } from 'next';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetUNTour(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/un-tour/reset
const resetUNTour = async (req: NextApiRequest, res: NextApiResponse) => {
  let tickets = ticketStore.tickets;

  try {
    tickets = [];

    return res.status(200).send({ data: [], message: 'Successfully reset un-tour posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset un-tour posts' });
  }
};
