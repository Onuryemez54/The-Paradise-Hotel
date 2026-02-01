'use server';
import { feedbackSchema } from '@/types/schemas/feedbackSchema';
import { enforceRateLimit } from '@/lib/redis/enforceRateLimit';
import { feedbackEmailTemplate } from '@/utils/feedback-helpers/feedbackEmailTemplate';
import { formatTopicLabel } from '@/utils/feedback-helpers/formatTopicLabel';
import { ErrorKey } from '@/types/i18n/keys';
import { ActionResultType } from '@/lib/errors/helpers/handleAppError';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendFeedback = async (
  data: FormData
): Promise<ActionResultType> => {
  const parsedData = feedbackSchema.parse({
    topic: data.get('topic'),
    name: data.get('name'),
    email: data.get('email'),
    message: data.get('message'),
    company: data.get('company'), // honeypot
  });

  if (parsedData.company && parsedData.company.trim() !== '') {
    return { ok: true };
  }

  const rateLimitResult = await enforceRateLimit({
    action: 'send-feedback',
    email: parsedData.email,
  });

  if (!rateLimitResult.ok) {
    return rateLimitResult;
  }

  const prettyTopic = formatTopicLabel(parsedData.topic);

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

    return { ok: true };
  } catch (err) {
    console.error('FEEDBACK_MAIL_FAILED', err);
    return { ok: false, error: ErrorKey.FEEDBACK_SEND_FAILED };
  }
};
