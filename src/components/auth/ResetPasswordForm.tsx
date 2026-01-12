'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import {
  resetPasswordInput,
  resetPasswordSchema,
} from '@/types/schemas/authSchemas';
import { ButtonKey, ErrorKey, FormKey } from '@/types/i18n/keys';
import { Form } from '../ui/form/Form';
import { PasswordField } from '../ui/form/fields/PasswordField';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { updatePasswordAction } from '@/lib/actions/auth-actions/update-password-action';

export const ResetPasswordForm = () => {
  const toast = useToast();
  const t = useTranslations(ErrorKey.TITLE);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<resetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const submit = async (data: resetPasswordInput) => {
    setIsPending(true);
    try {
      await updatePasswordAction({ newPassword: data.newPassword });
    } catch (err) {
      handleAppError({ err, t, toast });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form form={form} onSubmit={submit}>
      <PasswordField labelKey={FormKey.NEW_PASSWORD} name="newPassword" />
      <PasswordField
        labelKey={FormKey.CONFIRM_PASSWORD}
        name="confirmPassword"
      />
      <CustomButton
        variant="primary"
        type="submit"
        i18nKey={ButtonKey.UPDATE_PASSWORD}
        isLoading={isPending}
        disabled={isPending}
      />
    </Form>
  );
};
