import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '../../types';
import { ticketStore } from '..';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, cursor, limit } = req.query;
      if (page && limit) return getTopOfTheRockByPage(req, res);
      if (cursor && limit) return getTopOfTheRock(req, res);
      return getTopOfTheRock(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const getTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/2/108');

    return res.status(200).json({ data: result.data, message: 'Successfully retrieved top of the rocks' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get top of the rocks' });
  }
};

const getTopOfTheRockByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    let activeTicket = ticketStore.activeTicket;
    let tickets = ticketStore.tickets;

    if (activeTicket !== 'top-of-the-rock' && tickets.length === 0) {
      await ticketStore.fetchTicket('top-of-the-rock', 'http://localhost:3000/api/production/adapter/types/2/108');
      await ticketStore.sortTicket(sort as RequiredKeysOf<any>, order as Order);

      tickets = ticketStore.tickets;
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    } else if (activeTicket === 'top-of-the-rock' && tickets.length > 0) {
      await ticketStore.sortTicket(sort as RequiredKeysOf<any>, order as Order);

      tickets = ticketStore.tickets;
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    } else if (activeTicket !== 'top-of-the-rock' && tickets.length > 0) {
      await ticketStore.fetchTicket('top-of-the-rock', 'http://localhost:3000/api/production/adapter/types/2/108');
      await ticketStore.sortTicket(sort as RequiredKeysOf<any>, order as Order);

      tickets = ticketStore.tickets;
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    }
  } catch (error) {
    return res.status(500).send({ data: null, message: 'Failed to get top of the rocks' });
  }
};
