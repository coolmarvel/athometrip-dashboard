import { NextApiRequest, NextApiResponse } from 'next';
import { parseIP, readSession, writeSession } from './db';
import axios from 'axios';

/**
 * 로그아웃 API
 *
 * @author 이성현
 */
const API_SIGNOUT_URL = process.env.NEXT_PUBLIC_API_SIGNOUT;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return signout(req, res);
    default:
      return res.status(405).end();
  }
}

const signout = async (req: NextApiRequest, res: NextApiResponse) => {
  await parseIP(req)
    .then(async (ip) => {
      try {
        const response = await axios.post(`${API_SIGNOUT_URL}`, {}, { withCredentials: true });

        const session = await readSession();

        delete session[ip];

        res.setHeader('Set-Cookie', [
          'userId=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax',
          'sessionId=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax',
          'accessToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax',
          'refreshToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax',
        ]);

        return res.status(200).json({ data: null, message: 'Success' });
      } catch {
        return res.status(500).json({ data: null, message: 'Failed' });
      }
    })
    .catch(() => {
      return res.status(400).json({ data: null, message: 'Failed to parse IP' });
    });
};
