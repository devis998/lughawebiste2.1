import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, company, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Send email or save to database

    return res.status(200).json({ success: true, message: 'Contact message received' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
