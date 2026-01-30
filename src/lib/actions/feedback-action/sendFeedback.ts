'use server';
import { feedbackSchema } from '@/types/schemas/feedbackSchema';
import { Resend } from 'resend';
import { enforceRateLimit } from '../helpers/enforceRateLimit';
import { feedbackEmailTemplate } from '@/utils/feedback-helpers/feedbackEmailTemplate';
import { formatTopicLabel } from '@/utils/feedback-helpers/formatTopicLabel';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFeedback(data: FormData) {
  const parsedData = feedbackSchema.parse({
    topic: data.get('topic'),
    name: data.get('name'),
    email: data.get('email'),
    message: data.get('message'),
    company: data.get('company'),
  });

  const prettyTopic = formatTopicLabel(parsedData.topic);

  // Honeypot field check
  if (parsedData.company && parsedData.company.trim() !== '') {
    return;
  }

  // Enforce rate limit
  await enforceRateLimit({ action: 'send-feedback', email: parsedData.email });

  try {
    await resend.emails.send({
      from: 'The Paradise Hotel <support@paradisehotel.live>',
      to: [process.env.FEEDBACK_RECEIVER_EMAIL!],
      replyTo: parsedData.email,
      subject: `[Feedback • ${prettyTopic}] Paradise Hotel`,
      html: feedbackEmailTemplate({
        ...parsedData,
        topic: prettyTopic,
      }),
    });
  } catch (err) {
    console.error('FEEDBACK_MAIL_FAILED', err);
  }
}
