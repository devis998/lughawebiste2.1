import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, name, email, company, organizationType, message } = body;

    // Validation
    if (!action || !name || !email) {
      return NextResponse.json(
        { success: false, message: 'Action, name, and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
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

    const isGetStarted = action === 'get_started';
    const subject = isGetStarted ? 'New Network Registration - Lugha' : 'Case Studies Request - Lugha';

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'getlugha@gmail.com',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #2C3E70; padding-bottom: 10px;">
            ${isGetStarted ? 'New Network Registration' : 'Case Studies Request'}
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${organizationType ? `<p><strong>Organization Type:</strong> ${organizationType}</p>` : ''}
          </div>

          ${message ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #2C3E70;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>This request was sent from the Lugha clients section.</p>
            <p>Action: ${isGetStarted ? 'Join Network' : 'View Case Studies'}</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: isGetStarted ? 'Network registration submitted successfully' : 'Case studies request submitted successfully'
    });

  } catch (error) {
    console.error('Clients form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Clients API is working' },
    { status: 200 }
  );
}