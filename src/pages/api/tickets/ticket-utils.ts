import { Order } from '@/apis';
import { RequiredKeysOf } from 'type-fest';
import { getKeys, getValue } from '../redis';

export const getTicketById = async (ticketName: string, ticketId: string): Promise<any> => {
  const keys = await getKeys(`${ticketName}_*`);
  for (const key of keys) {
    const ticketsData: any = await getValue(key);
    if (ticketsData) {
      const ticket = ticketsData.find((ticket: any) => ticket.order.id === ticketId);
      if (ticket) return ticket;
    }
  }

  return null;
};

export const checkExistingDataInRange = async (name: string, after: string, before: string) => {
  const keys = await getKeys(`${name}_*`);
  for (const key of keys) {
    const [_, savedAfter, savedBefore] = key.split('_');
    if (new Date(savedAfter) <= new Date(after) && new Date(savedBefore) >= new Date(before)) return await getValue(key);
  }

  return null;
};

export const sortTicket = (tickets: any, sort: RequiredKeysOf<any>, order: Order): Promise<any> => {
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

export const filterTicket = (tickets: any, after: string, before: string) => {
  const start = new Date(after);
  const end = new Date(before);

  return tickets.filter((ticket: any) => {
    const ticketDate = new Date(ticket.order.date_created);

    return ticketDate >= start && ticketDate <= end;
  });
};
