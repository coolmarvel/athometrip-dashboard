import { NextApiRequest, NextApiResponse } from 'next';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetTopOfTheRock(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/top-of-the-rock/reset
const resetTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  let tickets = ticketStore.tickets;

  try {
    tickets = [];

    return res.status(200).send({ data: [], message: 'Successfully reset top-of-the-rock posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset top-of-the-rock posts' });
  }
};
