import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '../../types';
import { ticketStore, useTicketStore } from '@/stores';

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

const processData = async (data: any, sort?: RequiredKeysOf<any>, order?: Order, search?: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (sort && order) {
        data = data.map((item: any) => ({ ...item, id: parseInt(item.order.id, 10) }));
        data = data.sort((a: any, b: any) => {
          const ac = a[sort];
          const bc = b[sort];

          if (ac > bc) return order === 'desc' ? -1 : 1;
          else if (ac < bc) return order === 'desc' ? 1 : -1;
          else return 0;
        });
      }
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

const get911Memorials = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/1/11');

    return res.status(200).json({ data: result.data, message: 'Successfully retrieved 911 memorials' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get 911 memorials' });
  }
};

const get911MemorialsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    let tickets = ticketStore.getState().tickets;
    if (tickets.length === 0) {
      await ticketStore.getState().fetchTicket('http://localhost:3000/api/production/adapter/types/1/11');
      await ticketStore.getState().sortTicket(tickets, sort as RequiredKeysOf<any>, order as Order);

      tickets = ticketStore.getState().tickets;
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));
      return res.status(200).json({ data: { total: tickets.length, data: slicedTickets }, message: 'Successfully retrieved 911 memorials' });
    } else if (tickets.length > 0) {
      await ticketStore.getState().sortTicket(ticketStore.getState().tickets, sort as RequiredKeysOf<any>, order as Order);

      tickets = ticketStore.getState().tickets;
      const slicedTickets = tickets.slice(Number(offset), Number(offset) + Number(limit));
      return res.status(200).json({ data: { total: tickets.length, data: slicedTickets }, message: 'Successfully retrieved 911 memorials' });
    }

    // if (memorial911Store.getState().data.length === 0) {
    //   await memorial911Store.getState().fetchData();
    //   const memorial911 = await memorial911Store.getState().sortData(memorial911Store.getState().data, sort as RequiredKeysOf<any>, order as Order);
    //   const slicedMemorial911 = memorial911.slice(Number(offset), Number(offset) + Number(limit));

    //   return res.status(200).json({ data: { total: memorial911.length, data: slicedMemorial911 }, message: 'Successfully retrieved 911 memorials' });
    // } else if (memorial911Store.getState().data.length > 0) {
    //   const memorial911 = await memorial911Store.getState().sortData(memorial911Store.getState().data, sort as RequiredKeysOf<any>, order as Order);
    //   const slicedMemorial911 = memorial911.slice(Number(offset), Number(offset) + Number(limit));

    //   return res.status(200).json({ data: { total: memorial911.length, data: slicedMemorial911 }, message: 'Successfully retrieved 911 memorials' });
    // }

    // const result = await axios.get('http://localhost:3000/api/production/adapter/types/1/11');
    // let memorial911 = result.data;
    // memorial911 = await processData(memorial911, sort as RequiredKeysOf<any>, order as Order, search as string);
    // const slicedMemorial911 = memorial911.slice(Number(offset), Number(offset) + Number(limit));

    // return res.status(200).json({ data: { total: memorial911.length, data: slicedMemorial911 }, message: 'Successfully retrieved 911 memorials' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get 911 memorials' });
  }
};
