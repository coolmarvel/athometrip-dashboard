import { NextApiRequest, NextApiResponse } from 'next';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetCityTrip(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/tickets/city-trip/reset
const resetCityTrip = async (req: NextApiRequest, res: NextApiResponse) => {
  let tickets = ticketStore.tickets;

  try {
    tickets = [];

    return res.status(200).send({ data: [], message: 'Successfully reset city-trip posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset city-trip posts' });
  }
};
