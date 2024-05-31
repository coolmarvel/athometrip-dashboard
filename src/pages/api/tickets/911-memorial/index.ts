import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import ticketStore from '../ticket-store';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '@/apis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, cursor, limit } = req.query;
      if (page && limit) return get911MemorialsByPage(req, res);
      if (cursor && limit) return get911Memorials(req, res);
      return get911Memorials(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const ticketName = '911-memorial';
const productName = '911 메모리얼';
const url = 'http://localhost:3000/api/production/adapter/orders';

const get911Memorials = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get(`${url}?product_name=${productName}`);

    return res.status(200).json({ data: result.data, message: 'Successfully retrieved 911-memorial' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get 911-memorial' });
  }
};

const get911MemorialsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, product, total, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  console.log(req.query);

  try {
    let activeTicket = ticketStore.activeTicket;
    let tickets = ticketStore.tickets;

    await ticketStore.fetchTicket(`${url}?product_name=${productName}&start_date=${after}&end_date=${before}`);
    await ticketStore.sortTicket(sort as RequiredKeysOf<any>, order as Order);

    activeTicket = ticketName;
    tickets = ticketStore.tickets;
    const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

    return res.status(200).send({ data: { total: tickets.length, data: slicedTickets }, product: activeTicket });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to get 911-memorial' });
  }
};
