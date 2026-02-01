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
import { ButtonKey, ErrorKey, FormKey, SuccessKey } from '@/types/i18n/keys';
import { Form } from '../ui/form/Form';
import { PasswordField } from '../ui/form/fields/PasswordField';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { updatePasswordAction } from '@/lib/actions/auth-actions/update-password-action';
import { useRouter } from 'next/navigation';

export const ResetPasswordForm = () => {
  const router = useRouter();
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
      const result = await updatePasswordAction({
        newPassword: data.newPassword,
      });

      const error = handleAppError({
        result,
        t,
        toast,
      });

      if (error) return;

      router.push(`/account?status=${SuccessKey.PASSWORD_UPDATED}`);
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
