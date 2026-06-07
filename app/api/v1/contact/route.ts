import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  company: z.string().max(100).nullable().optional().or(z.literal('')),
  subject: z.string().max(150).nullable().optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(2000, 'Message cannot exceed 2000 characters'),
});

// POST /api/v1/contact - public access
export async function POST(req: NextRequest) {
  try {
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

    // Note: We can integrate Resend or other email dispatchers here in Phase 5
    console.log(`[Contact Submission] Saved: ID ${submission.id} from ${submission.email}`);

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('API Error: POST contact submission failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to process message' }, { status: 500 });
  }
}
