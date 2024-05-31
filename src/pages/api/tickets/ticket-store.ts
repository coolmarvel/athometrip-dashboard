import { Order } from '@/apis';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';

class TicketStore {
  public activeTicket: string;
  public tickets: any[];

  constructor() {
    this.activeTicket = '';
    this.tickets = [];
  }

  clearTicket(): Promise<any> {
    return new Promise((resolve) => {
      this.tickets = [];
      this.activeTicket = '';

      return resolve(true);
    });
  }

  fetchTicket(url: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(url);
        this.tickets = data;

        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  sortTicket(sort: RequiredKeysOf<any>, order: Order): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (sort && order) {
          this.tickets = this.tickets.map((ticket) => ({ ...ticket, id: parseInt(ticket.order.id, 10) }));
          this.tickets = this.tickets.sort((a, b) => {
            const ac = a[sort];
            const bc = b[sort];

            if (ac > bc) return order === 'desc' ? -1 : 1;
            else if (ac < bc) return order === 'desc' ? 1 : -1;
            else return 0;
          });
        }

        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

const ticketStore = new TicketStore();

export default ticketStore;
