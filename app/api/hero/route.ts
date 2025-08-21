import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { languagePair, service, deadline } = body;

    // Validation
    if (!languagePair || !service) {
      return NextResponse.json(
        { success: false, message: 'Language pair and service are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'getlugha@gmail.com',
      subject: `New Language Expert Request - Lugha`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #14B8A6; padding-bottom: 10px;">New Language Expert Request</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Request Details</h3>
            <p><strong>Language Pair:</strong> ${languagePair}</p>
            <p><strong>Service:</strong> ${service}</p>
            ${deadline ? `<p><strong>Deadline:</strong> ${deadline}</p>` : ''}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>This request was sent from the Lugha hero section.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Language expert request submitted successfully'
    });

  } catch (error) {
    console.error('Hero form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Hero API is working' },
    { status: 200 }
  );
}