import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '../../types';
import { setValue } from '@/pages/api';
import { checkExistingDataInRange, filterTicket, sortTicket } from '../ticket-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, limit } = req.query;
      if (page && limit) return getSummitByPage(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const ticketName = 'summit';
const url = process.env.NEXT_PUBLIC_APIS_URL as string;
const productId = process.env.NEXT_PUBLIC_SUMMIT as string;

const getSummitByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${ticketName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(ticketName, after, before);
    let tickets: any[] = existingData ? existingData : [];

    if (tickets.length === 0) {
      const { data } = await axios.get(`${url}?product_id=${productId}&after=${after}&before=${before}`);
      await setValue(key, data);

      tickets = await filterTicket(data, after, before);
      tickets = await sortTicket(tickets, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    } else {
      tickets = await filterTicket(tickets, after, before);
      tickets = await sortTicket(tickets, sort as RequiredKeysOf<any>, order as Order, search as string);
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    }
  } catch {
    return res.status(500).send({ data: null, message: `Failed to get ${ticketName}` });
  }
};
