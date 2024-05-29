import { NextApiRequest, NextApiResponse } from 'next';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return reset911Memorial(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/911-memorial/reset
const reset911Memorial = async (req: NextApiRequest, res: NextApiResponse) => {
  let tickets = ticketStore.tickets;

  try {
    tickets = [];

    return res.status(200).send({ data: [], message: 'Successfully reset 911-memorial posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset 911-memorial posts' });
  }
};
