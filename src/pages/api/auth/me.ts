import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../users/db';
import { parseIP, readMySession } from './db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return me(req, res);
    default:
      return res.status(405).end();
  }
}

export const me = async (req: NextApiRequest, res: NextApiResponse) => {
  await parseIP(req)
    .then(async (ip) => {
      const sessionId = req.cookies.sessionId;

      const users = await getUser();

      const session = await readMySession(ip);

      const user = users.find((user: any) => user.userId === req.cookies.userId);

      return res.status(200).json({ data: user ?? null, message: 'Success' });
    })
    .catch(() => {
      return res.status(400).json({ data: null, message: 'Failed to parse IP' });
    });
};
