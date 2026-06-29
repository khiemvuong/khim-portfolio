import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiter map
const ipCache = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const limitWindow = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 2;

  // Periodic cleanup of expired cache records to prevent memory leak
  if (ipCache.size > 1000) {
    for (const [key, value] of ipCache.entries()) {
      if (now > value.resetTime) {
        ipCache.delete(key);
      }
    }
  }

  const record = ipCache.get(ip);

  if (!record || now > record.resetTime) {
    const newRecord = { count: 1, resetTime: now + limitWindow };
    ipCache.set(ip, newRecord);
    return { allowed: true, remaining: maxRequests - 1, resetInMs: limitWindow };
  }

  if (record.count >= maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetInMs: Math.max(0, record.resetTime - now) 
    };
  }

  record.count += 1;
  return { 
    allowed: true, 
    remaining: maxRequests - record.count, 
    resetInMs: Math.max(0, record.resetTime - now) 
  };
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() 
            || request.headers.get('x-real-ip') 
            || '127.0.0.1';

    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      const minutesRemaining = Math.ceil(limit.resetInMs / 1000 / 60);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded.', 
          message: `Too many uplink transmissions. Cooldown active. Please retry in ${minutesRemaining} minute(s).` 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(limit.resetInMs / 1000).toString()
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Mandatory fields missing: name, email, message' },
        { status: 400 }
      );
    }

    // Generate a telemetry hash for a premium cyberpunk experience
    const rawPayload = `${name}-${email}-${subject || ''}-${message}`;
    const hash = crypto.createHash('sha256').update(rawPayload).digest('hex').substring(0, 16).toUpperCase();

    // Log the message server-side
    console.log(`[CONTACT_TRANSMISSION] [HASH: ${hash}] From: ${name} <${email}>. Subject: ${subject}. Message: ${message}`);

    // Create SMTP transport configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465' || parseInt(process.env.SMTP_PORT || '465') === 465, // True for port 465
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Basic HTML email template styled with portfolio theme colors
    const mailOptions = {
      from: `"Khiem Vuong (Portfolio Gateway)" <${process.env.SMTP_USER}>`,
      to: email, // Sends email to the address entered in the form (destination)
      bcc: process.env.SMTP_USER, // Owner receives a carbon copy of the incoming inquiry
      replyTo: process.env.SMTP_USER, // Replies go to the owner
      subject: `[Uplink Confirmation] ${subject || 'Inquiry Recorded'} - Ref: ${hash}`,
      text: `Hello ${name},\n\nThank you for reaching out! Your message has been successfully routed to my gateway.\n\nHere is a copy of your transmission:\nSubject: ${subject || 'N/A'}\nMessage:\n${message}\n\nRef Hash: ${hash}\nTimestamp: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: monospace, sans-serif; background-color: #0d0d1a; color: #e2e8f0; padding: 25px; border: 1px solid #a855f7; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22d3ee; border-bottom: 1px solid #1e1b4b; padding-bottom: 10px; font-weight: bold; text-transform: uppercase; margin-top: 0; font-size: 18px; tracking-wide: 1px;">
            📡 Uplink Transmission Received
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #a855f7; width: 100px; font-weight: bold;">SENDER:</td>
              <td style="padding: 6px 0; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a855f7; font-weight: bold;">EMAIL:</td>
              <td style="padding: 6px 0; color: #22d3ee;"><a href="mailto:${email}" style="color: #22d3ee; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a855f7; font-weight: bold;">SUBJECT:</td>
              <td style="padding: 6px 0; color: #ffffff;">${subject || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a855f7; font-weight: bold;">REF HASH:</td>
              <td style="padding: 6px 0; color: #ec4899;">${hash}</td>
            </tr>
          </table>
          <div style="background-color: #070714; border: 1px solid #312e81; padding: 15px; border-radius: 4px; color: #e2e8f0; white-space: pre-wrap; line-height: 1.5; font-size: 13px;">
${message}
          </div>
          <div style="font-size: 10px; color: #64748b; margin-top: 25px; border-top: 1px solid #1e1b4b; padding-top: 10px; text-align: center;">
            SYSTEM TELEMETRY GATEWAY · MERN_PORTFOLIO_X01 · ${new Date().toLocaleString('vi-VN')}
          </div>
        </div>
      `,
    };

    // Send the email transmission
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Uplink transmission successful.',
      hash: `MERN_GATEWAY_OK_${hash}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[SMTP_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal system gateway error', details: errorMessage },
      { status: 500 }
    );
  }
}
