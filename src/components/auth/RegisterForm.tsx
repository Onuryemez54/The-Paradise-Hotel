'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from '@/types/schemas/authSchemas';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';
import { registerAction } from '@/lib/actions/auth-actions/register-action';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { Form } from '../ui/form/Form';
import { TextField } from '../ui/form/fields/TextField';
import { CustomButton } from '../ui/custom-components/CustomButton';
import { ButtonKey, ErrorKey, FormKey, TitleKey } from '@/types/i18n/keys';
import { PasswordField } from '../ui/form/fields/PasswordField';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const router = useRouter();
  const toast = useToast();
  const t = useTranslations(ErrorKey.TITLE);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    setIsPending(true);
    const registerPayload = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    };
    try {
      const result = await registerAction(registerPayload);

      const error = handleAppError({
        result,
        t,
        toast,
      });

      if (error) return;

      router.push(`/auth/verify?status=${TitleKey.VERIFY_EMAIL}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextField labelKey={FormKey.NAME} name="fullName" type="text" />
      <TextField labelKey={FormKey.EMAIL} name="email" type="email" />
      <PasswordField labelKey={FormKey.PASSWORD} name="password" />
      <PasswordField
        labelKey={FormKey.CONFIRM_PASSWORD}
        name="confirmPassword"
      />
      <CustomButton
        variant="submit"
        i18nKey={ButtonKey.REGISTER}
        type="submit"
        isLoading={isPending}
        disabled={isPending}
      />
    </Form>
  );
};
