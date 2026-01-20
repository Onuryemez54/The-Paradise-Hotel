'use client';
import { ChangeEvent, useState } from 'react';
import { CustomTitle } from '../../ui/custom-components/CustomTitle';
import { ListItemKey, SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { CustomSubTitle } from '../../ui/custom-components/CustomSubTitle';
import { CustomListItem } from '../../ui/custom-components/CustomListItem';
import { UserImage } from '../../common/UserImage';

interface ProfileFormHeaderProps {
  image: string | null;
  onFileSelect: (file: File | null) => void;
}

export const ProfileFormHeader = ({
  image,
  onFileSelect,
}: ProfileFormHeaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <UserImage
        image={previewUrl || image || '/icons/default-user.png'}
        size="large"
        borderColor="primary-300"
      />

      <div className="flex flex-col items-center gap-1">
        <CustomTitle variant="subheading" i18nKey={TitleKey.UPDATE_PROFILE} />
        <CustomSubTitle
          variant="section"
          i18nKey={SubTitleKey.UPDATE_PROFILE}
          className="opacity-70"
        />
      </div>

      <div className="mt-1">
        <label htmlFor="profilePhoto">
          <CustomListItem
            i18nKey={ListItemKey.UPDATE_PROFILE}
            variant="large"
            className="cursor-pointer"
          />
        </label>

        <input
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
