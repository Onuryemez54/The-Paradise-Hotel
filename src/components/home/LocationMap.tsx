import { SubTitleKey, TitleKey } from '@/types/i18n/keys';
import { ScrollReveal } from '../common/animation/ScrollReveal';
import { CustomTitle } from '../ui/custom-components/CustomTitle';
import { CustomSubTitle } from '../ui/custom-components/CustomSubTitle';

export const LocationMap = () => {
  return (
    <ScrollReveal delay={0.1}>
      <section className="relative px-6 py-4 md:px-20">
        <div className="from-primary-800/30 via-primary-700/20 absolute inset-0 rounded-xl bg-linear-to-b to-transparent" />
        <CustomTitle
          variant="subheading"
          className="mb-4 justify-center"
          i18nKey={TitleKey.LOCATION}
        />

        <CustomSubTitle
          variant="section"
          className="text-primary-100 mb-6 text-center leading-relaxed"
          i18nKey={SubTitleKey.LOCATION}
        />

        <div className="border-primary-500/40 relative h-64 w-full overflow-hidden rounded-xl border shadow-2xl backdrop-blur-[2px] md:h-96">
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637086.3873396297!2d7.5!3d48.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4790cba7a5fd2fdf%3A0xdea0d0105d01d9af!2sBlack%20Forest!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Paradise Hotel Location Map"
            className="rounded-xl"
          />
        </div>
      </section>
    </ScrollReveal>
  );
};
