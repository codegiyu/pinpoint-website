import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { mailTemplate, MailTemplateData } from '../utils/mailTemplate';
import { formatCamelCaseName } from '@/lib/utils/general';
import { ALL_FIELDS_DEFAULT } from '@/lib/constants/forms';
import type { PublicFormAttachment } from '@/lib/api/public-form-submission';

type MailPayload = {
  formName?: string;
  attachments?: PublicFormAttachment[];
  [key: string]: string | string[] | PublicFormAttachment[] | undefined;
};

function withNoCacheHeaders(response: NextResponse) {
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
  );
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

function normalizeFields(payload: MailPayload) {
  return Object.entries(payload).reduce<Record<string, string | string[]>>((acc, [key, value]) => {
    if (key === 'attachments' || value == null) return acc;
    if (Array.isArray(value)) {
      acc[key] = value.filter(item => typeof item === 'string').map(item => String(item));
      return acc;
    }
    acc[key] = String(value);
    return acc;
  }, {});
}

function firstString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as MailPayload;
    const fields = normalizeFields(payload);
    const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];
    const formName = firstString(fields.formName);

    if (!formName) {
      return withNoCacheHeaders(
        NextResponse.json(
          {
            success: false,
            message: 'Mail sending failed',
            error: 'Please include a subject for the mail',
          },
          { status: 400 }
        )
      );
    }

    const invalidFields: string[] = [];
    for (const key of Object.keys(fields)) {
      if (!allowedFields.has(key)) invalidFields.push(key);
    }

    if (invalidFields.length) {
      return withNoCacheHeaders(
        NextResponse.json(
          {
            success: false,
            message: 'Mail sending failed',
            error: `The field(s) ${invalidFields.map(item => `"${item}"`).join(', ')} are invalid`,
          },
          { status: 400 }
        )
      );
    }

    const transporter = nodemailer.createTransport({
      port: Number(process.env.emailPort) || 465,
      host: process.env.emailHost,
      auth: {
        user: process.env.fromEmail,
        pass: process.env.password,
      },
      secure: process.env.secureMail === undefined ? true : Boolean(process.env.secureMail),
    });

    const attachmentLines = attachments
      .map(att => `${att.filename || 'Attachment'}: ${att.url || 'No URL'}`)
      .join('\n');

    const mailTemplateOptions = {
      title: formName,
      top: [
        [
          `You've received a new submission through the website ${formName} \
          form. The details provided by the sender are included below for your review.`,
        ],
      ],
      data: [
        ...Object.entries(fields).reduce<MailTemplateData[]>((acc, [property, value]) => {
          if (property !== 'formName') {
            acc.push({
              property: formatCamelCaseName(property),
              value: Array.isArray(value) ? value.join(', ') : value,
            });
          }
          return acc;
        }, []),
        ...(attachmentLines ? [{ property: 'Attachments', value: attachmentLines }] : []),
      ],
      end: 'Please feel free to follow up with the sender if any further \
      information is needed.',
    };
    const html = mailTemplate(mailTemplateOptions);

    const senderName =
      firstString(fields.name) ||
      firstString(fields.brandName) ||
      firstString(fields.company) ||
      firstString(fields.contactPerson) ||
      `${firstString(fields.firstName)} ${firstString(fields.lastName)}`.trim() ||
      'Pinpoint Website';
    const replyName = senderName === 'Pinpoint Website' ? '' : senderName;
    const senderEmail = firstString(fields.email);

    const mailOptions = {
      from: `${senderName} (From Pinpoint Website) <${process.env.fromEmail}>`,
      to: `Pinpoint Global <${process.env.toEmail}>`,
      ...(senderEmail
        ? {
            replyTo: `${replyName || senderEmail} <${senderEmail}>`,
          }
        : {}),
      subject: `${formName.trim()} Form Submission`,
      html,
    };

    const data = await transporter.sendMail(mailOptions);

    if (senderEmail) {
      const senderAckHtml = mailTemplate({
        title: `Your Form Submission Has Been Received`,
        top: [
          [
            'Thank you for reaching out to us via our website. We have successfully received \
            your submission and our team is currently reviewing the details.',
          ],
          [
            'A member of our team will be in touch with you shortly to provide further \
            assistance and address your request.',
          ],
          [
            'We appreciate your interest in Pinpoint Global and look forward to \
            connecting with you soon.',
          ],
          ['Warm regards', 'Adepoju Olayode', 'CEO', 'Pinpoint Global'],
        ],
        data: [],
        end: '',
      });
      transporter.sendMail({
        from: `Pinpoint (no-reply) <${process.env.fromEmail}>`,
        to: `${replyName || senderEmail} <${senderEmail}>`,
        subject: `${formName.trim()} Form Submission Received`,
        html: senderAckHtml,
      });
    }

    return withNoCacheHeaders(
      NextResponse.json({ success: true, data, message: 'Mail sent successfully' }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return withNoCacheHeaders(
      NextResponse.json(
        {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          message: 'Error sending mail',
        },
        { status: 500 }
      )
    );
  }
}

const allowedFields = new Set([
  ...Object.keys(ALL_FIELDS_DEFAULT),
  'formName',
  'name',
  'firstName',
  'lastName',
  'email',
  'phone',
  'tel',
  'company',
  'services',
  'message',
  'portfolio',
  'linkedin',
  'formType',
  'jobSlug',
  'attachments',
]);
