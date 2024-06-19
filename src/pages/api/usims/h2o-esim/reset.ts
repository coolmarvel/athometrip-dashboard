import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetH2oEsim(req, res);
    default:
      return res.status(405).end();
  }
}

const resetH2oEsim = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: 'Successfully reset h2o-eism posts' });
  } catch {
    return res.status(500).send({ data: null, message: 'Failed to reset h2o-eism posts' });
  }
};
