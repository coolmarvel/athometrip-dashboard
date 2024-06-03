import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import ticketStore from '../ticket-store';
import { RequiredKeysOf } from 'type-fest';
import { Order } from '@/apis';
import { setValue, getValue } from '../../redis';

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
  console.log(req.query);
  const offset = (Number(page) - 1) * Number(limit);
  // IP 추출을 위한 x-forwarded-for 헤더 확인
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // IP 주소를 문자열로 변환하고, 배열 형태로 온 경우 첫 번째 주소를 선택
  const clientIp = Array.isArray(ip) ? ip[0] : ip?.split(',')[0].trim();

  const key = `${clientIp}-${ticketName}`;
  console.log(key);

  try {
    const { data } = await axios.get(`${url}?product_name=${productName}&start_date=${after}&end_date=${before}`);
    const sortedTickets = await sortTicket(data, sort as RequiredKeysOf<any>, order as Order);
    await setValue(key, sortedTickets);

    const slicedTickets = sortedTickets.slice(Number(offset), Number(offset) + Number(limit));

    return res.status(200).send({ data: { total: sortedTickets.length, data: slicedTickets }, product: '' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to get 911-memorial' });
  }
};

const sortTicket = (tickets: any, sort: RequiredKeysOf<any>, order: Order): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (sort && order) {
        tickets = tickets.map((ticket: any) => ({ ...ticket, id: parseInt(ticket.order.id, 10) }));
        tickets = tickets.sort((a: any, b: any) => {
          const ac = a[sort];
          const bc = b[sort];

          if (ac > bc) return order === 'desc' ? -1 : 1;
          else if (ac < bc) return order === 'desc' ? 1 : -1;
          else return 0;
        });
      }

      return resolve(tickets);
    } catch (error) {
      return reject(error);
    }
  });
};
