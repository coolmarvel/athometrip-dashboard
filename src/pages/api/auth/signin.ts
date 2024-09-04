import { NextApiRequest, NextApiResponse } from 'next';
import { parseIP } from './db';
import axios from 'axios';

/**
 * 로그인 API
 *
 * @author 이성현
 */
const API_SIGNIN_URL = process.env.NEXT_PUBLIC_API_SIGNIN;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return signin(req, res);
    default:
      return res.status(405).end();
  }
}

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  await parseIP(req)
    .then(async (ip) => {
      const { userId, password } = req.body;

      try {
        const response = await axios.post(`${API_SIGNIN_URL}`, {
          userId: userId,
          password: password,
        }, {
          withCredentials: true, // 쿠키 전송할 수 있도록 설정
        });

        if (response.status === 200) {
          res.setHeader('Set-Cookie', [
            `sessionId=${response.data.sessionId}; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax`,
            `accessToken=${response.data.accessToken}; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax`,
            `refreshToken=${response.data.refreshToken}; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax`,
            `userId=${userId}; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax`,
          ]);

          return res.status(200).json(response.data);
        } else {
          return res.status(response.status).json({ message: response.statusText });
        }

      } catch (error) {
        console.error('Signin error: ', error);
        return res.status(500).json({ message: 'An error occurred during signin.' });
      }
    })
    .catch(() => {
      return res.status(400).json({ data: null, message: 'Failed to parse IP' });
    });
};
