'use client';
import { useToast } from '@/context/ToastContext';
import { useReservation } from '@/context/ReservationContext';
import { useTranslations } from 'next-intl';
import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePrice } from '@/hooks/usePrice';
import {
  BadgeKey,
  ButtonKey,
  ErrorKey,
  FormKey,
  ListItemKey,
  SuccessKey,
} from '@/types/i18n/keys';
import { Badge } from '@/components/common/Badge';
import { UserImage } from '@/components/common/UserImage';
import { differenceInDays } from 'date-fns';
import { BookingInput, bookingSchema } from '@/types/schemas/bookingSchemas';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import { Form } from '@/components/ui/form/Form';
import { SelectField } from '../../ui/form/fields/SelectField';
import { TextareaField } from '../../ui/form/fields/TextareaField';
import { CustomButton } from '../../ui/custom-components/CustomButton';
import { CheckboxField } from '../../ui/form/fields/CheckboxField';
import { editBookingAction } from '@/lib/actions/booking-actions/edit-booking.action';
import { createBookingAction } from '@/lib/actions/booking-actions/create-booking-action';
import { isRangeOverlapping } from '@/utils/booking-helpers/isRangeOverlapping';
import { BookingRange } from '@/utils/booking-helpers/types';
import { useRates } from '@/context/PriceRatesContext';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  user: User;
  roomId: string;
  roomPrice: number;
  breakfastPrice: number;
  maxCapacity: number;
  bookedRanges: BookingRange[];
  isExternalReset: React.RefObject<boolean>;
  bookingId?: string;
  initialGuests?: number;
  initialBreakfast?: boolean;
  initialObservation?: string;
}

export const BookingForm = ({
  user,
  roomId,
  roomPrice,
  breakfastPrice,
  maxCapacity,
  bookedRanges,
  isExternalReset,
  bookingId,
  initialGuests,
  initialBreakfast,
  initialObservation,
}: BookingFormProps) => {
  const router = useRouter();
  const toast = useToast();
  const rates = useRates();
  const isEditMode = Boolean(bookingId);

  const tS = useTranslations(SuccessKey.TITLE);
  const tE = useTranslations(ErrorKey.TITLE);
  const tList = useTranslations(ListItemKey.TITLE);

  const [isPending, setIsPending] = useState(false);

  const prevModeRef = useRef<'create' | 'edit' | null>(null);
  const isSyncingRef = useRef(false);
  const isSubmittingRef = useRef(false);

  const {
    range,
    guests,
    setGuests,
    breakfastIncluded,
    setBreakfastIncluded,
    observations,
    setObservations,
    invalidReason,
    setInvalidReason,
    resetAll,
    mode,
  } = useReservation();

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: isEditMode
      ? {
          numGuests: String(initialGuests),
          breakfastIncluded: initialBreakfast,
          observations: initialObservation,
        }
      : {
          numGuests: String(guests),
          breakfastIncluded,
          observations,
        },
  });

  useEffect(() => {
    if (!isExternalReset.current) return;

    isSyncingRef.current = true;

    form.reset({
      numGuests: String(guests),
      breakfastIncluded,
      observations,
    });

    queueMicrotask(() => {
      isSyncingRef.current = false;
    });

    isExternalReset.current = false;
  }, [guests, breakfastIncluded, observations, form]);

  useEffect(() => {
    if (prevModeRef.current === 'edit' && mode === 'create') {
      isSyncingRef.current = true;

      form.reset({
        numGuests: '1',
        breakfastIncluded: false,
        observations: '',
      });

      queueMicrotask(() => {
        form.setValue('numGuests', '1', {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });

        isSyncingRef.current = false;
      });
    }

    prevModeRef.current = mode;
  }, [mode, form]);

  useEffect(() => {
    if (isEditMode) return;
    if (invalidReason === 'none') return;

    isSyncingRef.current = true;

    switch (invalidReason) {
      case 'range': {
        toast.warning(tE(ErrorKey.INVALID_BOOKING_DATES), 4000);
        resetAll();

        form.reset({
          numGuests: '1',
          breakfastIncluded: false,
          observations: '',
        });

        queueMicrotask(() => {
          form.setValue('numGuests', '1', {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
          isSyncingRef.current = false;
        });
        break;
      }

      case 'guest': {
        toast.warning(tE(ErrorKey.INVALID_SELECTED_GUEST_NUMBER), 4000);
        const safeGuests = maxCapacity;

        setGuests(safeGuests);

        queueMicrotask(() => {
          form.setValue('numGuests', String(safeGuests), {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
          isSyncingRef.current = false;
        });
        break;
      }

      case 'range_and_guest': {
        toast.warning(tE(ErrorKey.INVALID_RANGE_AND_GUEST), 4000);

        resetAll();

        form.reset({
          numGuests: '1',
          breakfastIncluded: false,
          observations: '',
        });

        queueMicrotask(() => {
          form.setValue('numGuests', '1', {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
          isSyncingRef.current = false;
        });
        break;
      }
    }

    setInvalidReason('none');
  }, [
    invalidReason,
    isEditMode,
    maxCapacity,
    resetAll,
    setGuests,
    setInvalidReason,
    form,
    toast,
    tE,
  ]);

  const watchedGuestsRaw = form.watch('numGuests');
  const watchedBreakfast = form.watch('breakfastIncluded');
  const watchedObservations = form.watch('observations');

  useEffect(() => {
    if (isSubmittingRef.current) return;
    if (isSyncingRef.current) return;
    if (invalidReason !== 'none') return;

    const safeGuests =
      watchedGuestsRaw && Number(watchedGuestsRaw) > 0
        ? Number(watchedGuestsRaw)
        : 1;

    setGuests(safeGuests);
    setBreakfastIncluded(watchedBreakfast);
    setObservations(watchedObservations || '');
  }, [
    watchedGuestsRaw,
    watchedBreakfast,
    watchedObservations,
    setGuests,
    setBreakfastIncluded,
    setObservations,
  ]);

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const extrasPrice = breakfastIncluded
    ? breakfastPrice * numNights * guests
    : 0;

  const isRangeInvalid =
    !startDate ||
    !endDate ||
    numNights <= 0 ||
    (!bookingId &&
      isRangeOverlapping({ from: startDate, to: endDate }, bookedRanges));

  const canSubmit = !isRangeInvalid && !isPending;

  const { formatPrice } = usePrice(breakfastPrice, rates);

  const onSubmit = async (values: BookingInput) => {
    if (!startDate || !endDate) return;

    isSubmittingRef.current = true;
    setIsPending(true);

    try {
      const formData = new FormData();

      formData.append('roomId', String(roomId));
      formData.append('numGuests', values.numGuests);
      formData.append(
        'breakfastIncluded',
        values.breakfastIncluded ? 'yes' : 'no'
      );
      formData.append('observations', values.observations || '');
      formData.append('numNights', String(numNights));
      formData.append('extrasPrice', String(extrasPrice));
      formData.append('roomPrice', String(roomPrice));
      formData.append('startDate', startDate.toISOString());
      formData.append('endDate', endDate.toISOString());

      if (!!bookingId) {
        formData.append('bookingId', bookingId);
        await editBookingAction(formData);
        toast.success(tS(SuccessKey.BOOKING_UPDATED), 2000, true);
      } else {
        await createBookingAction(formData);
        toast.success(tS(SuccessKey.BOOKING_CREATED), 2000, true);
      }
      resetAll();
      startTransition(() => {
        router.replace('/account/bookings');
      });
    } catch (err) {
      handleAppError({ err, t: tE, toast });
    } finally {
      setIsPending(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <section className="flex w-full justify-center px-4 py-2 sm:px-6 lg:px-8">
      <div className="bg-primary-900/60 border-border w-full max-w-2xl overflow-hidden rounded-2xl border shadow-xl">
        <header className="from-primary-800 to-primary-500 flex items-center justify-between bg-linear-to-r px-2 py-4 sm:px-6">
          <Badge variant="primary" i18nKey={BadgeKey.LOGGED_IN} />
          <div className="flex items-center gap-4">
            <UserImage
              image={user.image ?? '/icons/default-user.png'}
              borderColor="primary-400"
            />
            <h2 className="text-primary-300 hidden font-semibold sm:flex">
              {user.name}
            </h2>
          </div>
        </header>
        <Form form={form} onSubmit={onSubmit} className="px-2 py-4">
          <SelectField
            name="numGuests"
            labelKey={FormKey.NUM_GUESTS}
            options={Array.from({ length: maxCapacity }, (_, i) => ({
              label: `${i + 1} ${i + 1 === 1 ? tList(ListItemKey.GUEST_SINGLE) : tList(ListItemKey.GUEST_MULTIPLE)}`,
              value: String(i + 1),
            }))}
            variant="booking"
            disabled={isPending}
          />

          <TextareaField
            name="observations"
            labelKey={FormKey.OBSERVATIONS}
            placeholderKey={FormKey.OBSERVATIONS}
            variant="booking"
            disabled={isPending}
          />

          <CheckboxField
            name="breakfastIncluded"
            labelKey={FormKey.ADD_BREAKFAST}
            labelValues={{ price: formatPrice() }}
            variant="booking"
            disabled={isPending}
          />

          <div className="flex justify-end">
            <CustomButton
              type={canSubmit ? 'submit' : 'button'}
              variant={canSubmit ? 'primary' : 'secondary'}
              disabled={!canSubmit}
              isLoading={isPending}
              i18nKey={
                !bookingId ? ButtonKey.CREATE_BOOKING : ButtonKey.UPDATE_BOOKING
              }
            />
          </div>
        </Form>
      </div>
    </section>
  );
};
