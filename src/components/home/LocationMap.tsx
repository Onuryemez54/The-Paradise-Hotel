import { SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { CustomSubTitle } from '../ui/custom-components/CustomSubTitle';

export const LocationMap = () => {
  return (
    <div className="from-primary-700 to-primary-800 text-primary-200 font-body flex h-full w-full flex-col rounded-2xl bg-linear-to-br p-6 shadow-2xl">
      <CustomTitle
        variant="subheading"
        className="mb-2 justify-center"
        i18nKey={TitleKey.LOCATION}
      />

      <CustomSubTitle variant="account" i18nKey={SubTitleKey.LOCATION} />

      <div className="border-primary-500/30 relative mt-auto h-64 w-full overflow-hidden rounded-xl border shadow-lg md:h-[360px]">
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637086.3873396297!2d7.5!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4790cba7a5fd2fdf%3A0xdea0d0105d01d9af!2sBlack%20Forest!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
          className="h-full w-full rounded-xl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Paradise Hotel Location Map"
        />
      </div>
    </div>
  );
};
