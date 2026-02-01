'use client';
import {
  ErrorKey,
  FormKey,
  FeedbackTopicKey,
  SuccessKey,
  ButtonKey,
  SubTitleKey,
  TitleKey,
} from '@/types/i18n/keys';
import { SelectField } from '../ui/form/fields/SelectField';
import { TextareaField } from '../ui/form/fields/TextareaField';
import { TextField } from '../ui/form/fields/TextField';
import { Form } from '../ui/form/Form';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { FeedbackInput, feedbackSchema } from '@/types/schemas/feedbackSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CustomButton } from '../ui/custom-components/CustomButton';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { CustomSubTitle } from '../ui/custom-components/CustomSubTitle';
import { sendFeedback } from '@/lib/actions/feedback-action/sendFeedback';
import { useRouter } from 'next/navigation';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { useToast } from '@/context/ToastContext';

export const FeedbackForm = () => {
  const router = useRouter();
  const toast = useToast();

  const tE = useTranslations(ErrorKey.TITLE);
  const tS = useTranslations(SuccessKey.TITLE);
  const tTopic = useTranslations('FEEDBACK_TOPIC');

  const { currentUser } = useAuth();
  const isAuthenticated = !!currentUser;

  const [isPending, setIsPending] = useState(false);

  const form = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      topic: FeedbackTopicKey.GENERAL,
      name: '',
      email: '',
      message: '',
      company: '', // Honeypot field
    },
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    form.reset({
      topic: FeedbackTopicKey.GENERAL,
      name: currentUser.name ?? '',
      email: currentUser.email ?? '',
      message: '',
      company: '', // Honeypot field
    });
  }, [currentUser, form, isAuthenticated]);

  const watchMessage = form.watch('message');
  const watchEmail = form.watch('email');
  const watchName = form.watch('name');

  const canSubmit = !!watchMessage && !!watchEmail && !!watchName && !isPending;

  const resetForm = () => {
    form.reset({
      topic: FeedbackTopicKey.GENERAL,
      name: isAuthenticated ? (currentUser?.name ?? '') : '',
      email: isAuthenticated ? (currentUser?.email ?? '') : '',
      message: '',
      company: '',
    });
  };

  const onSubmit = async (data: FeedbackInput) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append('topic', data.topic);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      formData.append('company', data.company ?? ''); // Honeypot field

      const result = await sendFeedback(formData);

      const error = handleAppError({
        result,
        t: tE,
        toast,
      });

      if (error) return;

      toast.success(tS(SuccessKey.FEEDBACK_SENT), 2000, true);
      router.refresh();
    } finally {
      resetForm();
      setIsPending(false);
    }
  };

  return (
    <div className="from-primary-700 to-primary-800 text-primary-200 font-body w-full rounded-2xl bg-linear-to-br p-6 shadow-2xl">
      <CustomTitle
        variant="subheading"
        className="mb-2 justify-center"
        i18nKey={TitleKey.FEEDBACK}
      />

      <CustomSubTitle variant="account" i18nKey={SubTitleKey.FEEDBACK} />

      <Form form={form} onSubmit={onSubmit} className="space-y-4">
        <SelectField
          name="topic"
          labelKey={FormKey.TOPIC}
          options={Object.values(FeedbackTopicKey).map((topic) => ({
            value: topic,
            label: tTopic(topic),
          }))}
          disabled={isPending}
        />

        <TextField
          name="name"
          labelKey={FormKey.NAME}
          autoComplete="name"
          disabled={isPending}
        />

        <TextField
          name="email"
          labelKey={FormKey.EMAIL}
          autoComplete="email"
          disabled={isPending || isAuthenticated}
          readOnly={isAuthenticated}
        />

        <TextareaField
          name="message"
          labelKey={FormKey.MESSAGE}
          placeholderKey={FormKey.MESSAGE}
          disabled={isPending}
        />

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div className="flex items-center justify-between pt-2">
          <CustomButton
            type="button"
            variant="tertiary"
            disabled={!watchMessage || isPending}
            i18nKey={ButtonKey.CLEAR}
            onAction={resetForm}
          />
          <CustomButton
            type="submit"
            variant="primary"
            disabled={!canSubmit}
            isLoading={isPending}
            i18nKey={ButtonKey.SEND}
          />
        </div>
      </Form>
    </div>
  );
};
