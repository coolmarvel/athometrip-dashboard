import { Nullable } from '@/types';
import { NextApiRequest } from 'next';
import { Session } from '../types';
import axios from 'axios';

/**
 * 세션 관리 API
 *
 * @author 이성현
 */
const API_READ_SESSION_URL = process.env.NEXT_PUBLIC_API_READ_SESSION;
const API_CREATE_SESSION_URL = process.env.NEXT_PUBLIC_API_CREATE_SESSION;

export const parseIP = (req: NextApiRequest) => {
  return new Promise<string>((resolve) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!ip) {
      throw new Error('Invalid request');
    }
    resolve(ip.toString());
  });
};

export const readSession = async (): Promise<Session> => {
  try {
    const response = await axios.post(`${API_READ_SESSION_URL}`);

    return response.data;
  } catch (err) {
    console.log('### Failed to read data from API');
    throw err;
  }
};

export const readMySession = async (ip: string): Promise<Nullable<number>> => {
  try {
    const session = await readSession();

    return session === null ? null : session[ip];
  } catch (err) {
    console.log('Failed to read db.json');
    throw err;
  }
};

export const writeSession = async (session: number) => {
  try {
    await axios.post(`${API_CREATE_SESSION_URL}`, session);
  } catch (err) {
    console.log('Failed to write data to API');
    throw err;
  }
};
