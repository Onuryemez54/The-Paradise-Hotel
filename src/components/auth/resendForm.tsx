'use client';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResendEmailInput,
  resendEmailSchema,
} from '@/types/schemas/authSchemas';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { ButtonKey, ErrorKey, FormKey, ListItemKey } from '@/types/i18n/keys';
import { Form } from '../ui/form/Form';
import { TextField } from '../ui/form/fields/TextField';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomListItem } from '../ui/custom-components/CustomListItem';
import { ArrowRight } from 'lucide-react';

type Mode = 'reset' | 'resendVerification' | 'resendReset';
type Props = {
  onSubmit: (email: string) => Promise<void>;
  mode: Mode;
};

export const ResendForm = ({ onSubmit, mode }: Props) => {
  const toast = useToast();
  const tE = useTranslations(ErrorKey.TITLE);
  const [isPending, setIsPending] = useState(false);
  const [isLoginAvailable, setIsLoginAvailable] = useState(false);

  const i18nKeyButton =
    mode === 'resendVerification'
      ? ButtonKey.RESEND_VERIFY_EMAIL
      : mode === 'resendReset'
        ? ButtonKey.RESEND_RESET_PASSWORD
        : ButtonKey.RESET_PASSWORD;

  const form = useForm<ResendEmailInput>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const submit = async ({ email }: ResendEmailInput) => {
    setIsPending(true);
    try {
      await onSubmit(email);
    } catch (err) {
      if (mode === 'resendVerification') {
        if (err instanceof Error) {
          if (
            err.message === ErrorKey.EMAIL_ALREADY_VERIFIED ||
            err.message === ErrorKey.USER_EXISTS_OAUTH
          ) {
            setIsLoginAvailable(true);
          }
        }
      }
      handleAppError({ err, t: tE, toast });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form form={form} onSubmit={submit}>
      <TextField labelKey={FormKey.EMAIL} name="email" type="email" />
      <CustomButton
        type="submit"
        variant="submit"
        i18nKey={i18nKeyButton}
        isLoading={isPending}
        disabled={isPending}
      />
      {isLoginAvailable && (
        <p className="text-primary-400 mt-4 flex items-center justify-center">
          <CustomListItem i18nKey={ListItemKey.PLEASE_LOGIN} variant="small" />
          <CustomButton
            variant="underlined"
            as="link"
            href="/auth/login"
            i18nKey={ButtonKey.LOGIN}
            className="ml-2"
            icon={<ArrowRight size={16} />}
          />
        </p>
      )}
    </Form>
  );
};
