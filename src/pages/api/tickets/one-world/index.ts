import { NextApiRequest, NextApiResponse } from 'next';
import { RequiredKeysOf } from 'type-fest';
import axios from 'axios';

import { Order } from '../../types';
import { checkExistingDataInRange, filterTicket, sortTicket } from '../ticket-utils';
import { setValue } from '../../redis';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, cursor, limit } = req.query;
      if (page && limit) return getOneWorldByPage(req, res);
    // if (cursor && limit) return getOneWorld(req, res);
    // return getOneWorld(req, res);
    case 'POST':
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

const ticketName = 'one-world';
const productName = '원 월드 전망대';
const url = 'http://localhost:3000/api/production/adapter/orders';

// const getOneWorld = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const result = await axios.get('http://localhost:3000/api/production/adapter/types/1/73');

//     return res.status(200).json({ data: result.data, message: 'Successfully retrieved one-world' });
//   } catch {
//     return res.status(500).json({ data: null, message: 'Failed to get one-world' });
//   }
// };

const getOneWorldByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, after, before, search } = req.query as { [key: string]: string };
  const offset = (Number(page) - 1) * Number(limit);

  const key = `${ticketName}_${after}_${before}`;

  try {
    const existingData = await checkExistingDataInRange(ticketName, after, before);
    let tickets: any = existingData ? existingData : [];

    if (tickets.length === 0) {
      const { data } = await axios.get(`${url}?product_name=${productName}&start_date=${after}&end_date=${before}`);
      tickets = await sortTicket(data, sort as RequiredKeysOf<any>, order as Order);

      await setValue(key, tickets);

      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    } else {
      tickets = await filterTicket(tickets, after, before);
      tickets = await sortTicket(tickets, sort as RequiredKeysOf<any>, order as Order);
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));

      return res.status(200).send({ data: { total: tickets.length, data: slicedTickets } });
    }
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to get one-world' });
  }
};
