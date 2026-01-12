import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

type Mode =
  | 'main'
  | 'dashboard'
  | 'bookings'
  | 'edit'
  | 'settings'
  | 'updatePassword';
interface AccountDivProps {
  children: ReactNode;
  mode: Mode;
}

const baseClass =
  'from-primary-700 to-primary-800 text-primary-200 font-body mx-auto w-full max-w-4xl rounded-2xl bg-linear-to-br shadow-2xl';

const modeStyles: Record<Mode, string> = {
  main: 'flex max-w-5xl flex-col items-center gap-3',
  dashboard: `p-4 md:p-6 lg:p-8 ${baseClass}`,
  bookings: `px-0.5 md:px-2 md:py-1 lg:px-6 lg:py-2  max-h-80 sm:max-h-96 3xl:h-auto 3xl:max-h-full  overflow-y-auto ${baseClass}`,
  edit: `h-auto px-1 py-2 md:px-2 md:py-4 p-6 2xl:py-10 ${baseClass}`,
  settings: `p-4 md:p-6 lg:p-8 ${baseClass}`,
  updatePassword: `px-8 py-2 ${baseClass}`,
};

export const AccountDiv = ({ children, mode }: AccountDivProps) => {
  return <div className={cn(modeStyles[mode])}>{children}</div>;
};
