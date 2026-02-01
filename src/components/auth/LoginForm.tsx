'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/types/schemas/authSchemas';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { loginAction } from '@/lib/actions/auth-actions/login-action';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { Form } from '@/components/ui/form/Form';
import { TextField } from '@/components/ui/form/fields/TextField';
import { PasswordField } from '@/components/ui/form/fields/PasswordField';
import { CustomButton } from '@/components/ui/custom-components/CustomButton';
import { CustomListItem } from '@/components/ui/custom-components/CustomListItem';
import {
  ButtonKey,
  ErrorKey,
  FormKey,
  ListItemKey,
  SuccessKey,
} from '@/types/i18n/keys';
import { ArrowRight } from 'lucide-react';
import { useStatusToast } from '@/hooks/useStatusToast';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { handleLogout } = useAuth();
  const params = useSearchParams();
  const status = params.get('status');

  const [formError, setFormError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const tE = useTranslations(ErrorKey.TITLE);
  const tS = useTranslations(SuccessKey.TITLE);

  useStatusToast({
    status,
    t: tE,
    toast,
    redirectTo: '/auth/login',
    onStatusLogout: handleLogout,
  });

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginInput) => {
    setIsPending(true);
    try {
      const result = await loginAction(values);

      const error = handleAppError({
        result,
        t: tE,
        toast,
      });

      if (error) {
        setFormError(true);
        return;
      }

      toast.success(tS(SuccessKey.LOGGED_IN));
      router.push('/account');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextField labelKey={FormKey.EMAIL} name="email" type="email" />
      <PasswordField labelKey={FormKey.PASSWORD} name="password" />
      {formError && (
        <div className="mt-2 flex items-center justify-between text-red-400">
          <CustomListItem
            variant="small"
            i18nKey={ListItemKey.INVALID_CREDENTIALS}
          />
          <CustomButton
            as="link"
            href="/auth/forgot-password"
            variant="underlined"
            i18nKey={ButtonKey.FORGOT_PASSWORD}
            icon={<ArrowRight size={16} />}
          />
        </div>
      )}
      <CustomButton
        type="submit"
        variant="submit"
        i18nKey={ButtonKey.LOGIN}
        isLoading={isPending}
        disabled={isPending}
      />
    </Form>
  );
};
