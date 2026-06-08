import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  company: z.string().max(100).nullable().optional().or(z.literal('')),
  subject: z.string().max(150).nullable().optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(2000, 'Message cannot exceed 2000 characters'),
});

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = (globalThis as any).contactRateLimitStore as Map<string, RateLimitEntry> | undefined;
const contactRateLimitStore = globalRateLimitStore ?? new Map<string, RateLimitEntry>();
if (!globalRateLimitStore) {
  (globalThis as any).contactRateLimitStore = contactRateLimitStore;
}

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return req.headers.get('x-real-ip') || 'unknown';
}

function getRateLimit(ip: string) {
  const now = Date.now();
  const entry = contactRateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    contactRateLimitStore.set(ip, { count: 1, resetAt });
    return { allowed: true, retryAfter: RATE_LIMIT_WINDOW_MS / 1000 };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  contactRateLimitStore.set(ip, entry);
  return { allowed: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}

// POST /api/v1/contact - public access
export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const rateLimit = getRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again after ${rateLimit.retryAfter} seconds.`,
        },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const body = await req.json();
    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        subject: data.subject || null,
        message: data.message,
      },
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.error('Resend configuration missing, contact email not sent.');
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Message saved but not delivered.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    try {
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Koventra contact request from ${data.name}`,
        html: `
          <h1>New contact message</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
          <hr />
          <p>${data.message.replace(/\n/g, '<br />')}</p>
        `,
        headers: {
          'Reply-To': data.email,
        },
      });
    } catch (emailError) {
      console.error('Resend email failed for contact submission:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send contact email. Message was saved for review.' },
        { status: 500 }
      );
    }

    console.log(`[Contact Submission] Saved: ID ${submission.id} from ${submission.email}`);
    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('API Error: POST contact submission failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to process message' }, { status: 500 });
  }
}
