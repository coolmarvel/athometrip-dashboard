import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '../../types';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, cursor, limit } = req.query;
      if (page && limit) return getEllisIslandByPage(req, res);
      if (cursor && limit) return getEllisIsland(req, res);
      return getEllisIsland(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const ticketName = 'ellis-island';
const url = 'http://localhost:3000/api/production/adapter/types';

const getEllisIsland = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/2/110');

    return res.status(200).json({ data: result.data, message: 'Successfully retrieved ellis-island' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get ellis-island' });
  }
};

const getEllisIslandByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, startDate, endDate, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    let tickets = ticketStore.tickets;

    await ticketStore.fetchTicket(ticketName, `${url}/1/9?start_date=${startDate}&end_date=${endDate}`);
    await ticketStore.sortTicket(sort as RequiredKeysOf<any>, order as Order);

    tickets = ticketStore.tickets;
    // tickets = tickets.filter((ticket) => ticket.lineItem.name.includes('엘리스'));
    const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

    return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
  } catch (error) {
    return res.status(500).send({ data: null, message: 'Failed to get ellis-island' });
  }
};