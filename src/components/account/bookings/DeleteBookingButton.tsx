'use client';
import { useTransition } from 'react';
import { cn } from '@/utils/utils';
import { LoaderCircle, Trash2Icon } from 'lucide-react';

interface DeleteBookingButtonProps {
  bookingId: string;
  onDelete: (bookingId: string) => Promise<void>;
}

export const DeleteBookingButton = ({
  bookingId,
  onDelete,
}: DeleteBookingButtonProps) => {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      data-testid="booking-delete"
      onClick={handleDelete}
      className={cn(
        isPending && 'cursor-not-allowed opacity-70',
        'cursor-pointer'
      )}
      disabled={isPending}
    >
      {!isPending ? (
        <Trash2Icon className="text-primary-200 h-4 w-4 transition-all duration-300 hover:rotate-135 hover:text-red-400 md:h-5 md:w-5" />
      ) : (
        <LoaderCircle className="h-4 w-4 animate-spin md:h-5 md:w-5" />
      )}
    </button>
  );
};
