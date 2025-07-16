import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, position, message, resume } = req.body;

    if (!name || !email || !position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Store applicant data or send email

    return res.status(200).json({ success: true, message: 'Application received' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
