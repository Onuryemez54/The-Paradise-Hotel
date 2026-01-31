'use client';
import { useTranslations } from 'next-intl';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateSettingsInput,
  updateSettingsSchema,
} from '@/types/schemas/updateSettingsSchema ';
import { updateProfileAction } from '@/lib/actions/auth-actions/update-profile-action';
import { getCountriesResponse } from '@/utils/getCountries';
import { handleAppError } from '@/lib/errors/helpers/handleAppError';
import {
  ButtonKey,
  ErrorKey,
  FormKey,
  ListItemKey,
  SuccessKey,
} from '@/types/i18n/keys';
import { ProfileFormHeader } from './ProfileFormHeader';
import { CustomButton } from '../../ui/custom-components/CustomButton';
import { Form } from '../../ui/form/Form';
import { TextField } from '../../ui/form/fields/TextField';
import { SelectField } from '../../ui/form/fields/SelectField';
import { CustomListItem } from '../../ui/custom-components/CustomListItem';
import Image from 'next/image';
import { User } from '@prisma/client';
import { useAuth } from '@/context/AuthContext';

interface UpdateProfileFormProps {
  user: User;
  countries: getCountriesResponse[];
}

export const UpdateProfileForm = ({
  user,
  countries,
}: UpdateProfileFormProps) => {
  const router = useRouter();
  const toast = useToast();
  const { refreshCurrentUser } = useAuth();

  const tE = useTranslations(ErrorKey.TITLE);
  const tS = useTranslations(SuccessKey.TITLE);

  const [isPending, setIsPending] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { name, email, countryFlag, nationalID, image, nationality } = user;

  const form = useForm<UpdateSettingsInput>({
    resolver: zodResolver(updateSettingsSchema),
    defaultValues: {
      fullName: name ?? '',
      email: email ?? '',
      nationality: nationality ?? '',
      nationalID: nationalID ?? '',
      countryFlag: countryFlag ?? '',
    },
  });

  const watchedNationality = form.watch('nationality');
  const selectedCountry = countries.find((c) => c.name === watchedNationality);

  const onSubmit = async (values: UpdateSettingsInput) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('nationality', values.nationality);
      formData.append('countryFlag', selectedCountry?.flag || '');
      formData.append('nationalID', values.nationalID ?? '');

      if (profileImage) {
        formData.append('profilePhoto', profileImage);
      }

      await updateProfileAction(formData);

      await refreshCurrentUser();

      toast.success(tS(SuccessKey.PROFILE_UPDATED), 2000, true);
      router.refresh();
    } catch (err) {
      handleAppError({ err, t: tE, toast });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <ProfileFormHeader image={image} onFileSelect={setProfileImage} />
      <TextField
        testId="full-name-input"
        name="fullName"
        labelKey={FormKey.NAME}
        autoComplete="name"
        disabled={isPending}
      />
      <TextField
        testId="email-input"
        name="email"
        labelKey={FormKey.EMAIL}
        disabled
        autoComplete="email"
      />
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <CustomListItem
            i18nKey={ListItemKey.WHERE_FROM}
            variant="small"
            className="flex-1"
          />

          {countryFlag && (
            <Image
              src={countryFlag}
              alt="Country flag"
              width={32}
              height={20}
              className="h-auto w-8 shrink-0 rounded-sm"
            />
          )}
        </div>
        <SelectField
          testId="nationality-select"
          disabled={isPending}
          name="nationality"
          labelKey={FormKey.NATIONALITY}
          options={countries.map((c) => ({
            label: c.name,
            value: c.name,
          }))}
        />
      </div>
      <TextField
        testId="national-id-input"
        name="nationalID"
        labelKey={FormKey.NATIONAL_ID}
        autoComplete="national-id"
        disabled={isPending}
      />
      <CustomButton
        variant="primary"
        type="submit"
        isLoading={isPending}
        disabled={isPending}
        i18nKey={ButtonKey.SAVE}
      />
    </Form>
  );
};
