'use client';
import { cn } from '@/utils/utils';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { loginWithGoogle } from '@/lib/actions/auth-actions/login-google-action';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { ButtonKey, SuccessKey } from '@/types/i18n/keys';
import { useRouter } from 'next/navigation';

type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'submit'
  | 'google'
  | 'bordered'
  | 'login'
  | 'register'
  | 'explore'
  | 'logout'
  | 'details'
  | 'ghost'
  | 'underlined'
  | 'delete_account';

type Href =
  | '/'
  | '/about'
  | '/auth/login'
  | '/auth/register'
  | '/auth/forgot-password'
  | '/rooms'
  | '/account/bookings'
  | '/account/settings'
  | `/rooms/${string}`;

type I18nKey = ButtonKey;

type BaseProps = {
  variant: Variant;
  i18nKey: I18nKey;
  className?: string;
  isAnimated?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  href?: Href;
  type?: 'button' | 'submit' | 'reset';
  mode?: 'nav' | 'account';
  onAction?: () => void;
  icon?: ReactNode;
  testId?: string;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type LinkProps = BaseProps & {
  as: 'link';
  href: Href;
};

type ListItemProps = BaseProps & {
  as: 'li';
};

type CustomButtonProps = ButtonProps | LinkProps | ListItemProps;

const baseClass =
  'flex items-center justify-center gap-2 cursor-pointer font-body font-semibold py-2 text-xs transition-all duration-300 sm:text-sm disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<Variant, string> = {
  primary:
    'rounded-lg bg-btn-primary-bg px-4 lg:px-6 text-btn-primary-foreground hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-foreground hover:translate-y-1',

  secondary:
    'rounded-lg  px-4 lg:px-6  text-primary-200/60 bg-btn-primary-bg/70',

  tertiary:
    'rounded-lg border border-accent-400 px-2 md:px-4 text-accent-400 hover:bg-accent-400 hover:text-accent-700',

  submit:
    'w-full rounded-lg border border-primary-500 px-4 text-primary-100 hover:bg-primary-500 hover:text-white md:text-lg',

  google:
    'w-full rounded-lg border border-primary-500 px-4 text-primary-100 hover:bg-primary-500 hover:text-white md:text-lg',

  bordered:
    'rounded-xl border border-accent-300 px-4 text-xs text-accent-400 hover:bg-accent-500/30 hover:text-accent-100 hover:translate-y-1 sm:text-sm',

  login:
    'rounded-xl border border-accent-300 px-4 text-xs text-accent-400 hover:bg-accent-500/30 hover:text-accent-200 hover:ring-1 hover:ring-accent-400 sm:text-sm',

  register:
    'rounded-xl border border-primary-300 px-4 text-xs text-primary-400 hover:bg-primary-500/30 hover:text-primary-200 hover:ring-1 hover:ring-primary-400 sm:text-sm',

  explore:
    'rounded-xl bg-linear-to-tr from-accent-700 via-primary-700 to-primary-600 px-4 text-explore-btn hover:scale-[1.03] hover:translate-y-1 md:px-6 md:py-3 hover:from-primary-600 hover:via-primary-700 hover:to-accent-700',

  logout:
    'justify-start px-4 hover:bg-sidebar-hover-bg  text-sidebar-foreground hover:text-sidebar-active-foreground',

  details:
    'rounded-xl border border-accent-border px-2 sm:px-2.5 md:px-4 text-primary-300 hover:bg-utility-hover-bg hover:text-utility-hover-text hover:translate-x-2',

  ghost:
    'rounded-xl border px-2 text-primary-300 hover:text-utility-hover-text hover:translate-x-2',
  underlined:
    'text-accent-400 font-semibold hover:underline hover:translate-x-1',
  delete_account:
    'justify-center gap-3 rounded-xl border p-2 text-sm font-medium transition-all lg:px-4 lg:py-3 lg:text-base xl:text-lg border-red-400/50 text-red-400 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-red-500/60 focus-visible:outline-none',
};

export const CustomButton = (props: CustomButtonProps) => {
  const router = useRouter();
  const toast = useToast();
  const t = useTranslations(ButtonKey.TITLE);
  const tS = useTranslations(SuccessKey.TITLE);
  const { handleLogout } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const classNames = cn(
    baseClass,
    variantStyles[props.variant],
    props.className,
    props.isAnimated && 'animate-in fade-in zoom-in duration-700 ease-out',
    props.mode === 'nav' && 'gap-2 rounded-b-lg px-4 py-2',
    props.mode === 'account' &&
      props.variant === 'logout' &&
      'hover:translate-x-1 border-primary-500 hover:border-sidebar-active-foreground  text-sidebar-foreground hover:bg-sidebar-active-bg/20  justify-center gap-3 rounded-xl border p-2 font-medium lg:px-4 lg:py-3 text-sm lg:text-base xl:text-lg'
  );

  const handleClick = async () => {
    if (props.variant === 'logout') {
      await handleLogout();
      props.onAction?.();
      router.push('/');
      router.refresh();
      toast.success(tS(SuccessKey.LOGOUT));
      return;
    }
    if (props.variant === 'google') {
      setIsPending(true);
      await loginWithGoogle();
      return;
    }

    props.onAction?.();
  };

  if (props.as === 'li') {
    return (
      <li title={t(props.i18nKey)} onClick={handleClick} className={classNames}>
        {props.icon && props.icon}
        <span
          className={cn(
            props.mode === 'nav' ? '' : 'hidden flex-1 sm:inline-block'
          )}
        >
          {t(props.i18nKey)}
        </span>
      </li>
    );
  }

  if (props.as === 'link') {
    return (
      <Link
        href={props.href}
        className={classNames}
        onClick={() => props.setIsOpen && props.setIsOpen(false)}
      >
        {props.variant === 'bordered' ? (
          <>
            {props.icon && props.icon}
            <span>{t(props.i18nKey)}</span>
          </>
        ) : (
          <>
            <span>{t(props.i18nKey)}</span>
            {props.icon && props.icon}
          </>
        )}
      </Link>
    );
  }

  const isBusy = props.variant === 'google' ? isPending : props.isLoading;

  const getLabel = () => {
    if (!isBusy) return t(props.i18nKey);

    if (props.variant === 'google') {
      return t(ButtonKey.CONNECTING);
    }

    switch (props.i18nKey) {
      case ButtonKey.LOGIN:
        return t(ButtonKey.LOGGING_IN);
      case ButtonKey.REGISTER:
        return t(ButtonKey.REGISTERING_IN);
      case ButtonKey.RESET_PASSWORD:
        return t(ButtonKey.SENDING);
      case ButtonKey.RESEND_VERIFY_EMAIL:
        return t(ButtonKey.SENDING);
      case ButtonKey.RESEND_RESET_PASSWORD:
        return t(ButtonKey.SENDING);
      case ButtonKey.SEND:
        return t(ButtonKey.SENDING);
      case ButtonKey.SAVE:
        return t(ButtonKey.SAVING);
      case ButtonKey.UPDATE_PASSWORD:
        return t(ButtonKey.UPDATING);
      default:
        return t(ButtonKey.CONFIRMING);
    }
  };

  return (
    <button
      data-testid={props.testId}
      type={props.type ?? 'button'}
      disabled={props.disabled || isPending || props.isLoading}
      onClick={handleClick}
      className={classNames}
    >
      {props.variant === 'google' && (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google"
          width={20}
          height={20}
          className={isPending ? 'opacity-60' : ''}
        />
      )}

      {props.icon && props.icon}

      {isBusy && props.variant !== 'google' && (
        <Loader2 className="h-5 w-5 animate-spin" />
      )}

      <span
        className={isBusy && props.variant === 'google' ? 'animate-pulse' : ''}
      >
        {getLabel()}
      </span>
    </button>
  );
};
