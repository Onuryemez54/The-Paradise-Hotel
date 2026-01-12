import { cn } from '@/utils/utils';

interface DividerProps {
  color?: string;
  m?: boolean;
}

export const Divider = ({ color, m }: DividerProps) => {
  return (
    <div
      className={cn(
        'my-4 border-t opacity-40',
        color ? `border-${color}` : 'border-primary-600',
        m ? 'mx-0' : 'mx-4'
      )}
    />
  );
};
