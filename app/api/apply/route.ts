import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, position, coverLetter, resume } = body;

    // Validation
    if (!name || !email || !position) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and position are required' },
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
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'getlugha@gmail.com',
      subject: `New Job Application - ${position} - Lugha`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">New Job Application</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Applicant Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Position:</strong> ${position}</p>
          </div>

          ${coverLetter ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Cover Letter</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
              ${coverLetter.replace(/\n/g, '<br>')}
            </div>
          </div>
          ` : ''}

          ${resume ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Resume</h3>
            <p style="color: #666;">Resume file was submitted (handling may require additional setup for file attachments).</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>This email was sent from the Lugha careers application form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email, // Allow direct reply to the applicant
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Apply API is working' },
    { status: 200 }
  );
}