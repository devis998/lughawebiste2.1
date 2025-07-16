import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, position, message, resume } = body;

  if (!name || !email || !position) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // TODO: Store applicant data or send email

  return NextResponse.json({ success: true, message: 'Application received' });
}