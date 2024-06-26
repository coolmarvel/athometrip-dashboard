import { Nullable } from '@/types';
import { NextApiRequest } from 'next';
import { readDB, writeDB } from '../db';
import { Session } from '../types';

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
    const db = await readDB();

    return db.session;
  } catch (err) {
    console.log('Failed to read db.json');
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

export const writeSession = async (session: Session) => {
  try {
    const db = await readDB();

    await writeDB({ ...db, session });
  } catch (err) {
    console.log('Failed to write db.json');
    throw err;
  }
};
